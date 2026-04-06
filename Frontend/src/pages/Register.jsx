import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '', username: '', email: '', password: '', year: '', Department: '', Age: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-neutral-900 bg-[#f8f9fa] p-4 sm:p-8">
      <div className="w-full max-w-[500px] bg-white p-8 sm:p-10 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 my-8">
        <div className="text-center flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200 mb-4">
            <CheckCircle2 className="w-6 h-6 text-neutral-800" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Create an account</h1>
          <p className="text-neutral-500 text-sm mt-2">Get started with your perfect workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-neutral-700">User ID</label>
              <input type="text" name="userId" required onChange={handleChange} className="input-field" placeholder="Emp-001" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-neutral-700">Username</label>
              <input type="text" name="username" required onChange={handleChange} className="input-field" placeholder="John Doe" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-neutral-700">Email Address</label>
            <input type="email" name="email" required onChange={handleChange} className="input-field" placeholder="you@company.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-neutral-700">Department</label>
              <input type="text" name="Department" required onChange={handleChange} className="input-field" placeholder="Engineering" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-neutral-700">Year</label>
              <input type="number" name="year" required onChange={handleChange} className="input-field" placeholder="2024" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-1">
              <label className="text-[13px] font-medium text-neutral-700">Age</label>
              <input type="number" name="Age" required onChange={handleChange} className="input-field" placeholder="25" />
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-[13px] font-medium text-neutral-700">Password</label>
              <input type="password" name="password" required onChange={handleChange} className="input-field" placeholder="Minimum 6 characters" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-8">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-[13px] text-neutral-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-neutral-900 transition hover:underline decoration-neutral-300 underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
