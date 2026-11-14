import { useEffect, useState } from 'react';
import { getIncidents, createIncident } from '../services/incident.service';

export default function RoadSafety() {
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState({ title: 'Flooding on Lake Road', description: 'Water accumulation at junction', category: 'flooding', severity: 'high', latitude: 12.97, longitude: 77.59 });

  useEffect(() => { loadIncidents(); }, []);

  const loadIncidents = async () => {
    const { data } = await getIncidents();
    setIncidents(data.incidents || []);
  };

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createIncident(form);
    loadIncidents();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <div className="card">
        <h2 className="text-xl font-semibold">Report a road incident</h2>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div><label className="label">Title</label><input className="input" name="title" value={form.title} onChange={handleChange} /></div>
          <div><label className="label">Description</label><textarea className="input" rows="4" name="description" value={form.description} onChange={handleChange} /></div>
          <div className="grid-2">
            <div><label className="label">Category</label><select className="input" name="category" value={form.category} onChange={handleChange}><option>accident</option><option>road damage</option><option>traffic obstruction</option><option>road construction</option><option>flooding</option><option>other hazard</option></select></div>
            <div><label className="label">Severity</label><select className="input" name="severity" value={form.severity} onChange={handleChange}><option>low</option><option>medium</option><option>high</option><option>critical</option></select></div>
          </div>
          <div className="grid-2">
            <div><label className="label">Latitude</label><input className="input" name="latitude" value={form.latitude} onChange={handleChange} /></div>
            <div><label className="label">Longitude</label><input className="input" name="longitude" value={form.longitude} onChange={handleChange} /></div>
          </div>
          <button className="btn btn-primary w-full" type="submit">Submit incident</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Incident overview</h2>
        <div className="mt-5 space-y-3">
          {incidents.map((incident) => (
            <div key={incident.id} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{incident.title}</div>
                <span className="badge">{incident.status}</span>
              </div>
              <div className="mt-2 text-sm text-slate-300">{incident.category} · {incident.severity} severity</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
