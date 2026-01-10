import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-4" data-testid="register-title">Create Account</h1>
          <p className="text-base text-muted-foreground">Join the Gauri family</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="register-form">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
              placeholder="Your name"
              data-testid="register-name"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
              placeholder="your@email.com"
              data-testid="register-email"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
              placeholder="••••••••"
              data-testid="register-password"
            />
            <p className="text-xs text-muted-foreground mt-2">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 disabled:opacity-50"
            data-testid="register-submit"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;