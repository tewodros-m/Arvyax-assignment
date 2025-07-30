import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    try {
      await register(form.email, form.password);
      toast.success('Registered successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-full max-w-sm'
      >
        <h2 className='text-xl font-semibold mb-4'>Register</h2>

        <Input
          name='email'
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name='password'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />

        <Button
          type='submit'
          className='w-full bg-green-600 text-white p-2 rounded'
          fullWidth={true}
          isLoading={isRegisterLoading}
        >
          Register
        </Button>

        <p className='text-sm mt-4 text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-green-600 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
