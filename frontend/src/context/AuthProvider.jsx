import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { AuthContext } from './AuthContext';
import api from '../api/axios';
import { getToken, removeToken, setToken } from '../utils/token';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const { token } = res.data;
    setToken(token);
    setUser({ email });
    navigate('/dashboard');
  };

  const register = async (email, password) => {
    await api.post('/register', { email, password });
    await login(email, password);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ email: decoded.id });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
