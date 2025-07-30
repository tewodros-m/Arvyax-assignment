import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import NavBar from './components/NavBar';

function App() {
  const { user, loading } = useAuth();
  // console.log('[App] user value:', user);

  if (loading) return <p>Loading auth...</p>; // or a spinner

  return (
    <>
      {user && <NavBar />}
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
        <Route
          path='/my-sessions'
          element={user ? <MySessions /> : <Navigate to='/login' />}
        />
        <Route
          path='/session-editor'
          element={user ? <SessionEditor /> : <Navigate to='/login' />}
        />
        <Route
          path='/session-editor/:id'
          element={user ? <SessionEditor /> : <Navigate to='/login' />}
        />

        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </>
  );
}

export default App;
