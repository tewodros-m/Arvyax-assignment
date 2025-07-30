import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react'; // uses lucide-react icons

function NavBar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='bg-white shadow-sm mb-4 relative z-50'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-green-600'>Arvyax Assignment</h1>

        {/* Menu toggle for mobile */}
        <button
          className='sm:hidden text-green-700'
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className='hidden sm:flex gap-6 items-center'>
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
          <button
            onClick={logout}
            className='text-red-500 hover:underline text-sm'
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className='absolute right-0 top-10 w-36 bg-white shadow-lg border border-gray-200 rounded-md flex flex-col items-end p-5  gap-3 sm:hidden'
        >
          <Link
            to='/dashboard'
            onClick={() => setMenuOpen(false)}
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
            onClick={() => setMenuOpen(false)}
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
            onClick={() => setMenuOpen(false)}
            className={
              isActive('/session-editor')
                ? 'text-green-600 font-medium'
                : 'text-gray-700'
            }
          >
            New Session
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className='text-red-500 hover:underline text-sm'
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
