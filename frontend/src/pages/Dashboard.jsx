import { useEffect, useState } from 'react';
import { BarChart3, CarFront, Gauge, MapPinned, Route, Activity, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { getDashboardOverview } from '../services/dashboard.service';

const palette = ['#3b82f6', '#14b8a6', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDashboardOverview();
        setData(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Dashboard unavailable');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-slate-200">Loading dashboard…</div>;
  if (error) return <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">{error}</div>;

  const metrics = [
    { label: 'Monitored vehicles', value: data.metrics.monitoredVehicles, icon: CarFront },
    { label: 'Road incidents', value: data.metrics.activeIncidents, icon: AlertTriangle },
    { label: 'Avg traffic speed', value: `${data.metrics.averageTrafficSpeed} km/h`, icon: Gauge },
    { label: 'Congestion', value: `${data.metrics.congestionPercentage}%`, icon: Activity },
    { label: 'CO₂ emissions', value: `${data.metrics.totalEmissions} t`, icon: MapPinned },
    { label: 'Saved routes', value: data.metrics.savedRoutes, icon: Route }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-300"><Icon size={18} /></div>
            </div>
            <div className="mt-4 text-3xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card xl:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">Traffic condition chart</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trafficTrend}>
                <defs>
                  <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/></linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#trafficFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold">Fleet utilization</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.utilization} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {data.utilization.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold">Carbon emission chart</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.emissionsTrend}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="emissions" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold">Mobility insights</h3>
          <ul className="space-y-3">
            {data.insights.map((item) => (
              <li key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="font-medium text-slate-100">{item.title}</div>
                <div className="mt-1 text-sm text-slate-400">{item.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
