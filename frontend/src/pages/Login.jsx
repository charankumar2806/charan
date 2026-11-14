import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: 'admin@smartmove.ai', password: 'demo-pass-123' });
  const [error, setError] = useState('');

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const { data } = await login(formData);
      localStorage.setItem('smartmove_token', data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to sign in.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-400">Sign in to your SmartMove AI workspace.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" name="password" type="password" value={formData.password} onChange={handleChange} />
          </div>
          {error && <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="mt-4 text-sm text-slate-400">Need an account? <Link to="/register" className="text-teal-300">Register</Link></p>
      </div>
    </div>
  );
}
