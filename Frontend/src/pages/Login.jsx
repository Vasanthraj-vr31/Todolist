import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-neutral-900 bg-[#f8f9fa]">
      {/* Centered Login Form */}
      <div className="w-full flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-[400px] space-y-8 bg-white p-10 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100">
          <div className="text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200 mb-6">
              <CheckCircle2 className="w-6 h-6 text-neutral-800" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Welcome back</h1>
            <p className="text-neutral-500 text-sm mt-2">Enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-start gap-2">
                <span className="block">{error}</span>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-neutral-700">Email Address</label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-neutral-700">Password</label>
                <a href="#" className="text-[13px] text-neutral-500 hover:text-neutral-800 transition underline decoration-neutral-300 underline-offset-2">Forgot?</a>
              </div>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-6">
              {loading ? 'Entering...' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-[13px] text-neutral-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-neutral-900 transition hover:underline decoration-neutral-300 underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
