import { useState } from 'react';
import { optimizeRoute } from '../services/route.service';

const defaultForm = {
  origin: 'MG Road, Bengaluru',
  destination: 'Whitefield, Bengaluru',
  vehicleType: 'car',
  fuelType: 'petrol',
  preference: 'balanced'
};

export default function RouteOptimizer() {
  const [formData, setFormData] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await optimizeRoute(formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Route optimization unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <div className="card">
        <h2 className="text-xl font-semibold">Route optimization</h2>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="label">Starting location</label>
            <input className="input" name="origin" value={formData.origin} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Destination</label>
            <input className="input" name="destination" value={formData.destination} onChange={handleChange} />
          </div>
          <div className="grid-2">
            <div>
              <label className="label">Vehicle type</label>
              <select className="input" name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="bus">Bus</option>
                <option value="bicycle">Bicycle</option>
                <option value="walking">Walking</option>
                <option value="delivery">Delivery vehicle</option>
              </select>
            </div>
            <div>
              <label className="label">Fuel type</label>
              <select className="input" name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Optimization preference</label>
            <select className="input" name="preference" value={formData.preference} onChange={handleChange}>
              <option value="fastest">Fastest</option>
              <option value="shortest">Shortest</option>
              <option value="lowest_emissions">Lowest emissions</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>
          {error && <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
          <button className="btn btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Optimizing…' : 'Optimize route'}</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Recommended route</h2>
        {result ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <div className="text-sm text-slate-400">Route source</div>
              <div className="mt-1 font-medium text-teal-300">{result.source}</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3"><div className="text-xs text-slate-400">Distance</div><div className="mt-1 text-xl font-bold">{result.distance} km</div></div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3"><div className="text-xs text-slate-400">Travel time</div><div className="mt-1 text-xl font-bold">{result.duration} min</div></div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <div className="text-sm text-slate-400">AI route explanation</div>
              <p className="mt-2 text-sm text-slate-200">{result.explanation}</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-slate-700 p-8 text-sm text-slate-400">No route selected yet.</div>
        )}
      </div>
    </div>
  );
}
