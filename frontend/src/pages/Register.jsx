import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { register } from '../services/auth.service';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: 'Demo Operator', email: 'operator@smartmove.ai', password: 'demo-pass-123', role: 'operator' });
  const [error, setError] = useState('');

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to register.');
    }
  };

  return (
    <div className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-slate-100">
      <div className="hero-orb -right-32 -top-40" />
      <div className="hero-orb -bottom-48 -left-40 !bg-blue-500/10" />
      <div className="auth-card relative w-full max-w-lg rounded-3xl p-7 sm:p-9">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-teal-200">
          <ArrowLeft size={14} /> Back to SmartMove
        </Link>
        <div className="mb-7 flex items-center gap-3">
          <div className="brand-mark grid h-11 w-11 place-items-center rounded-2xl text-lg font-black text-slate-950">S</div>
          <div>
            <div className="font-bold text-white">SmartMove AI</div>
            <div className="text-xs text-slate-500">Mobility operations workspace</div>
          </div>
        </div>
        <div className="section-kicker">Get started</div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Create your workspace</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Set up your profile to explore SmartMove AI.</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="label">Full name</label>
            <input className="input" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Email</label>
            <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Password</label>
            <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Role</label>
            <select className="input" name="role" value={formData.role} onChange={handleChange}>
              <option value="commuter">Commuter</option>
              <option value="operator">Operator</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>
          {error && <div className="md:col-span-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
          <button type="submit" className="btn btn-primary mt-1 md:col-span-2">Create account <ArrowRight size={16} /></button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-teal-200 hover:text-teal-100">Sign in</Link></p>
      </div>
    </div>
  );
}
