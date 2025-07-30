import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, loading } = useAuth();
  // console.log('[App] user value:', user);

  if (loading) return <p>Loading auth...</p>; // or a spinner

  return (
    <Routes>
      <Route
        path='/login'
        element={!user ? <Login /> : <Navigate to='/dashboard' />}
      />
      <Route
        path='/register'
        element={!user ? <Register /> : <Navigate to='/dashboard' />}
      />
      <Route
        path='/dashboard'
        element={user ? <Dashboard /> : <Navigate to='/login' />}
      />

      <Route path='*' element={<Navigate to='/dashboard' />} />
    </Routes>
  );
}

export default App;
