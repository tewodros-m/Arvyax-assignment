import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';

function ProtecteRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  // If the user is authenticated, render the children Otherwise, redirect to the login page
  return user ? children : <Navigate to='/login' replace />;
}

export default ProtecteRoute;
