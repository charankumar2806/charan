import { useState } from 'react';
import { analyzeTraffic } from '../services/ai.service';

export default function TrafficPrediction() {
  const [payload, setPayload] = useState({
    roadName: 'Outer Ring Road',
    vehicleCount: 1280,
    averageSpeed: 38,
    historicalTraffic: 41,
    timeOfDay: '18:00',
    dayOfWeek: 'Wednesday',
    weather: 'Clear'
  });
  const [result, setResult] = useState(null);

  const handleChange = (event) => setPayload((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await analyzeTraffic(payload);
    setResult(data);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
      <div className="card">
        <h2 className="text-xl font-semibold">Traffic forecasting</h2>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div><label className="label">Road name</label><input className="input" name="roadName" value={payload.roadName} onChange={handleChange} /></div>
          <div className="grid-2">
            <div><label className="label">Vehicle count</label><input className="input" name="vehicleCount" type="number" value={payload.vehicleCount} onChange={handleChange} /></div>
            <div><label className="label">Average speed</label><input className="input" name="averageSpeed" type="number" value={payload.averageSpeed} onChange={handleChange} /></div>
          </div>
          <div className="grid-2">
            <div><label className="label">Historical traffic</label><input className="input" name="historicalTraffic" type="number" value={payload.historicalTraffic} onChange={handleChange} /></div>
            <div><label className="label">Time of day</label><input className="input" name="timeOfDay" value={payload.timeOfDay} onChange={handleChange} /></div>
          </div>
          <div className="grid-2">
            <div><label className="label">Day of week</label><input className="input" name="dayOfWeek" value={payload.dayOfWeek} onChange={handleChange} /></div>
            <div><label className="label">Weather</label><input className="input" name="weather" value={payload.weather} onChange={handleChange} /></div>
          </div>
          <button className="btn btn-primary w-full" type="submit">Generate forecast</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Forecast result</h2>
        {result ? (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3"><div className="text-sm text-slate-400">Source</div><div className="mt-1 font-medium text-teal-300">{result.source}</div></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3"><div className="text-xs text-slate-400">Expected congestion</div><div className="mt-1 text-xl font-bold">{result.congestion}%</div></div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3"><div className="text-xs text-slate-400">Expected speed</div><div className="mt-1 text-xl font-bold">{result.speed} km/h</div></div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4"><div className="text-sm text-slate-400">Recommendation</div><p className="mt-2 text-sm text-slate-200">{result.recommendation}</p></div>
          </div>
        ) : <div className="mt-4 rounded-xl border border-dashed border-slate-700 p-8 text-sm text-slate-400">No forecast generated.</div>}
      </div>
    </div>
  );
}
