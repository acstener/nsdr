import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { updateUserProfile } from '../utils/supabaseUtils';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OCefGIXIG9naU0HJzZRM3ulZAppzn5s0gH0pT4NUUS22USqxaQFCxaTM5U2e4NiQO0PJ6UAJQk5uUtIWcQ8JeGT00iaqa4e0O');

const Onboarding = () => {
  const [improvementArea, setImprovementArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImprovementAreaSelection = async (area) => {
    setImprovementArea(area);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await updateUserProfile(user.id, { improvement_area: area });
    }
  };

  const handlePaymentSelection = async (planType) => {
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await updateUserProfile(user.id, { onboarded: true });
      }

      const priceId = planType === 'monthly' 
        ? 'price_1Pp8uOIXIG9naU0HGLId3m7k'  // Replace with your monthly price ID
        : 'price_1Pp8vDIXIG9naU0HEFEnjGj4'; // Replace with your one-time price ID

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: planType === 'monthly' ? 'subscription' : 'payment',
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-site-bg text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to NSDR.co</h1>
      
      {!improvementArea ? (
        <>
          <h2 className="text-2xl mb-4">What do you want to improve?</h2>
          <div className="flex space-x-4 mb-8">
            {['Sleep', 'Focus', 'Relax'].map((area) => (
              <button
                key={area}
                onClick={() => handleImprovementAreaSelection(area)}
                className="px-6 py-3 bg-nsdr-accent text-nsdr-dark rounded-full font-semibold"
              >
                {area}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Choose your plan</h2>
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => handlePaymentSelection('monthly')}
              disabled={loading}
              className="px-6 py-3 bg-nsdr-accent text-nsdr-dark rounded-full font-semibold"
            >
              Pay Monthly
            </button>
            <button
              onClick={() => handlePaymentSelection('onetime')}
              disabled={loading}
              className="px-6 py-3 bg-nsdr-accent text-nsdr-dark rounded-full font-semibold"
            >
              Pay Once
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Onboarding;