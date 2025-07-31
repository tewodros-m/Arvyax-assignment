import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';
import ProtecteRoute from './components/ProtectRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading auth...</p>; // or a spinner

  // Determine the default landing page based on auth status
  const defaultLandingPage = user ? '/dashboard' : '/login';

  return (
    <>
      {user && <NavBar />}
      <Routes>
        <Route
          path='/'
          element={<Navigate to={defaultLandingPage} replace />}
        />
        <Route
          path='/login'
          element={user ? <Navigate to='/dashboard' replace /> : <Login />}
        />
        <Route
          path='/register'
          element={user ? <Navigate to='/dashboard' replace /> : <Register />}
        />
        <Route
          path='/dashboard'
          element={
            <ProtecteRoute>
              <Dashboard />
            </ProtecteRoute>
          }
        />
        <Route
          path='/my-sessions'
          element={
            <ProtecteRoute>
              <MySessions />
            </ProtecteRoute>
          }
        />
        <Route
          path='/session-editor'
          element={
            <ProtecteRoute>
              <SessionEditor />
            </ProtecteRoute>
          }
        />
        <Route
          path='/session-editor/:id'
          element={
            <ProtecteRoute>
              <SessionEditor />
            </ProtecteRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
