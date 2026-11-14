import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-2xl font-bold">Create your account</h2>
        <p className="mt-2 text-sm text-slate-400">Build your smart mobility operations workspace.</p>
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
          <button type="submit" className="btn btn-primary md:col-span-2">Create account</button>
        </form>
        <p className="mt-4 text-sm text-slate-400">Already have an account? <Link to="/login" className="text-teal-300">Login</Link></p>
      </div>
    </div>
  );
}
