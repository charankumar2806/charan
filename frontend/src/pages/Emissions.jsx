import { useEffect, useState } from 'react';
import { getEmissionSummary } from '../services/emission.service';

export default function Emissions() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getEmissionSummary();
        setSummary(data);
      } catch (requestError) {
        setError(requestError.response?.data?.error || 'Unable to load emissions analytics.');
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">{error}</div>;
  if (!summary) return <div className="text-slate-200">Loading emissions analytics…</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card"><div className="text-sm text-slate-400">Total emissions</div><div className="mt-3 text-3xl font-bold">{summary.total} t</div></div>
        <div className="card"><div className="text-sm text-slate-400">Per journey</div><div className="mt-3 text-3xl font-bold">{summary.perJourney} kg</div></div>
        <div className="card"><div className="text-sm text-slate-400">Per km</div><div className="mt-3 text-3xl font-bold">{summary.perKm} kg</div></div>
        <div className="card"><div className="text-sm text-slate-400">Potential savings</div><div className="mt-3 text-3xl font-bold">{summary.savings}%</div></div>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Emission assumptions</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          {summary.assumptions.map((item) => <li key={item} className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
