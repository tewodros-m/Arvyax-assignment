import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-full max-w-sm'
      >
        <h2 className='text-xl font-semibold mb-4'>Login</h2>

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
          isLoading={isLoginLoading}
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
