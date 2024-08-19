import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Category from './pages/Category';
import TrackDetail from './pages/TrackDetail';
import Navbar from './components/Navbar';
import PersistentPlayer from './components/PersistentPlayer';
import Auth from './components/Auth';
import AuthCallback from './components/AuthCallback';
import Onboarding from './components/Onboarding';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserProfile(session.user.id);
      else setUserProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <AudioProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-site-bg text-nsdr-light">
          {session && <Navbar session={session} />}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/onboarding" element={
                session && (!userProfile || !userProfile.onboarded) 
                  ? <Onboarding /> 
                  : <Navigate to="/" />
              } />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/" element={
                session 
                  ? userProfile && userProfile.onboarded
                    ? <Home />
                    : <Navigate to="/onboarding" />
                  : <Navigate to="/auth" />
              } />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/track/:trackId" element={<TrackDetail />} />
            </Routes>
          </main>
          {session && <PersistentPlayer />}
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;