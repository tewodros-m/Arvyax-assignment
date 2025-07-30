import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-full max-w-sm'
      >
        <h2 className='text-xl font-semibold mb-4'>Login</h2>
        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <Input
          name='email'
          type='email'
          value={form.email}
          onChange={handleChange}
          placeholder='Email'
        />

        <Input
          name='password'
          type='password'
          value={form.password}
          onChange={handleChange}
          placeholder='Password'
        />

        <Button
          type='submit'
          className='w-full bg-green-600 text-white p-2 rounded'
          fullWidth={true}
        >
          Login
        </Button>

        <p className='text-sm mt-4 text-center'>
          Don't have an account?{' '}
          <Link to='/register' className='text-green-600 hover:underline'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
