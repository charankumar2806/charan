import { useEffect, useState } from 'react';
import { getTransitRoutes, getTransitStops } from '../services/transit.service';

export default function Transit() {
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [routesRes, stopsRes] = await Promise.all([getTransitRoutes(), getTransitStops()]);
      setRoutes(routesRes.data.routes || []);
      setStops(stopsRes.data.stops || []);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Transit routes</h2>
          <div className="mt-5 space-y-3">
            {routes.map((route) => <div key={route.id} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4"><div className="font-medium">{route.name}</div><div className="mt-1 text-sm text-slate-400">Delay: {route.delay} min · Duration: {route.duration} min</div></div>)}
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">Transit stops</h2>
          <div className="mt-5 space-y-3">
            {stops.map((stop) => <div key={stop.id} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4"><div className="font-medium">{stop.name}</div><div className="mt-1 text-sm text-slate-400">Type: {stop.type} · Service: {stop.serviceLevel}</div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
