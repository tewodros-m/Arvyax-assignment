import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function NotFound() {
  const { user } = useAuth();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50'>
      <h1 className='text-6xl font-bold text-red-600 mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-2 text-gray-800'>
        Page Not Found
      </h2>
      <p className='text-gray-600 mb-6'>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to={user ? '/dashboard' : '/login'}
        className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition'
      >
        {user ? 'Back to Dashboard' : 'Go to Login'}
      </Link>
    </div>
  );
}

export default NotFound;
