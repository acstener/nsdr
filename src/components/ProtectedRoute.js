import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, isSubscribed, isOnboarded }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (!isOnboarded) {
    return <Navigate to="/onboarding" />;
  }

  if (!isSubscribed) {
    return <Navigate to="/subscription" />; // You might want to create a subscription page
  }

  return children;
};

export default ProtectedRoute;