import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-slate-100">
      <div className="hero-orb -right-32 -top-40" />
      <div className="hero-orb -bottom-48 -left-40 !bg-blue-500/10" />
      <div className="auth-card relative w-full max-w-md rounded-3xl p-7 sm:p-9">
        <Link to="/" className="mb-9 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-teal-200">
          <ArrowLeft size={14} /> Back to SmartMove
        </Link>
        <div className="mb-7 flex items-center gap-3">
          <div className="brand-mark grid h-11 w-11 place-items-center rounded-2xl text-lg font-black text-slate-950">S</div>
          <div>
            <div className="font-bold text-white">SmartMove AI</div>
            <div className="text-xs text-slate-500">Mobility operations workspace</div>
          </div>
        </div>
        <div className="section-kicker">Welcome back</div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Sign in to continue</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Access your SmartMove AI workspace and city mobility tools.</p>
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
          <button type="submit" className="btn btn-primary mt-2 w-full">Sign in <ArrowRight size={16} /></button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">New to SmartMove? <Link to="/register" className="font-semibold text-teal-200 hover:text-teal-100">Create an account</Link></p>
      </div>
    </div>
  );
}
