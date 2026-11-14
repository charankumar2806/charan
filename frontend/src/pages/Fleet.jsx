import { useEffect, useState } from 'react';
import { getFleet, createVehicle, deleteVehicle } from '../services/fleet.service';

export default function Fleet() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ registration: 'KA-09-MB-9821', model: 'Electric Van', status: 'active', fuelType: 'electric', efficiency: 5.4, route: 'Delivery route 12' });

  useEffect(() => {
    loadFleet();
  }, []);

  const loadFleet = async () => {
    const { data } = await getFleet();
    setVehicles(data.vehicles || []);
  };

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleCreate = async (event) => {
    event.preventDefault();
    await createVehicle(form);
    setForm({ registration: '', model: '', status: 'active', fuelType: 'petrol', efficiency: 6, route: '' });
    loadFleet();
  };

  const handleDelete = async (id) => {
    await deleteVehicle(id);
    loadFleet();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
      <div className="card">
        <h2 className="text-xl font-semibold">Vehicle registration</h2>
        <form onSubmit={handleCreate} className="mt-5 space-y-4">
          <div><label className="label">Registration number</label><input className="input" name="registration" value={form.registration} onChange={handleChange} /></div>
          <div><label className="label">Model</label><input className="input" name="model" value={form.model} onChange={handleChange} /></div>
          <div className="grid-2">
            <div><label className="label">Status</label><select className="input" name="status" value={form.status} onChange={handleChange}><option>active</option><option>idle</option><option>maintenance</option><option>offline</option></select></div>
            <div><label className="label">Fuel type</label><select className="input" name="fuelType" value={form.fuelType} onChange={handleChange}><option>petrol</option><option>diesel</option><option>electric</option><option>hybrid</option></select></div>
          </div>
          <div className="grid-2">
            <div><label className="label">Efficiency</label><input className="input" type="number" name="efficiency" value={form.efficiency} onChange={handleChange} /></div>
            <div><label className="label">Assigned route</label><input className="input" name="route" value={form.route} onChange={handleChange} /></div>
          </div>
          <button className="btn btn-primary w-full" type="submit">Add vehicle</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Fleet listing</h2>
        <div className="mt-5 space-y-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{vehicle.model}</div>
                  <div className="text-sm text-slate-400">{vehicle.registration}</div>
                </div>
                <span className="badge">{vehicle.status}</span>
              </div>
              <div className="mt-3 text-sm text-slate-300">Fuel: {vehicle.fuelType} · Route: {vehicle.assignedRoute}</div>
              <button className="btn btn-secondary mt-3" onClick={() => handleDelete(vehicle.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
