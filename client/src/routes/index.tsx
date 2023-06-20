import React from 'react';
import { useAuth } from "../contexts/AuthContext";

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {

  const { admin } = useAuth();

  return admin ? <AppRoutes /> : <AuthRoutes />

}

export default Routes;