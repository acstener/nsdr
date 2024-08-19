import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      setMessage('Check your email for the login link!');
    } catch (error) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-site-bg text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Sign In to NSDR.co</h1>
      {!message ? (
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 mb-4 bg-nsdr-accent text-nsdr-dark rounded font-bold"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="mb-4">{message}</p>
          <button
            onClick={() => setMessage(null)}
            className="p-2 bg-nsdr-accent text-nsdr-dark rounded font-bold"
          >
            Back to Sign In
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Auth;