import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { updateUserProfile } from '../utils/supabaseUtils';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const updateUserSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await updateUserProfile(user.id, { subscribed: true });
        navigate('/');
      }
    };

    updateUserSubscription();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-site-bg text-white">
      <p>Payment successful! Redirecting to home page...</p>
    </div>
  );
};

export default PaymentSuccess;