import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-4" data-testid="login-title">Welcome Back</h1>
          <p className="text-base text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
              placeholder="your@email.com"
              data-testid="login-email"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
              placeholder="••••••••"
              data-testid="login-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 disabled:opacity-50"
            data-testid="login-submit"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="register-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;