import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

function NavBar() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className='bg-white shadow-sm mb-4'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex justify-between items-center'>
        <div className='space-x-4'>
          <Link
            to='/dashboard'
            className={
              isActive('/dashboard')
                ? 'text-green-600 font-medium'
                : 'text-gray-700'
            }
          >
            Dashboard
          </Link>
          <Link
            to='/my-sessions'
            className={
              isActive('/my-sessions')
                ? 'text-green-600 font-medium'
                : 'text-gray-700'
            }
          >
            My Sessions
          </Link>
          <Link
            to='/session-editor'
            className={
              isActive('/session-editor')
                ? 'text-green-600 font-medium'
                : 'text-gray-700'
            }
          >
            New Session
          </Link>
        </div>

        <button
          onClick={logout}
          className='text-red-500 hover:underline text-sm'
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
