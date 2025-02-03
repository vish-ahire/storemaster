import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;      