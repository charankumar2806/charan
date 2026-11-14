import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, CarFront, Gauge, MapPinned, Route } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { getDashboardOverview } from '../services/dashboard.service';

const palette = ['#5eead4', '#60a5fa', '#fbbf24', '#fb7185'];
const chartTooltip = {
  contentStyle: { backgroundColor: '#0b1220', border: '1px solid rgba(148, 163, 184, 0.18)', borderRadius: 12, color: '#e2e8f0' },
  labelStyle: { color: '#94a3b8' },
};

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

  if (loading) return <div className="card text-slate-300">Loading mobility overview…</div>;
  if (error) return <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.08] p-5 text-red-200">{error}</div>;

  const metrics = [
    { label: 'Monitored vehicles', value: data.metrics.monitoredVehicles, icon: CarFront, color: '#5eead4', background: 'rgba(45,212,191,.1)', glow: 'rgba(45,212,191,.09)' },
    { label: 'Road incidents', value: data.metrics.activeIncidents, icon: AlertTriangle, color: '#fb7185', background: 'rgba(251,113,133,.1)', glow: 'rgba(251,113,133,.08)' },
    { label: 'Average traffic speed', value: `${data.metrics.averageTrafficSpeed} km/h`, icon: Gauge, color: '#60a5fa', background: 'rgba(96,165,250,.1)', glow: 'rgba(96,165,250,.09)' },
    { label: 'Congestion index', value: `${data.metrics.congestionPercentage}%`, icon: Activity, color: '#fbbf24', background: 'rgba(251,191,36,.1)', glow: 'rgba(251,191,36,.08)' },
    { label: 'CO₂ emissions', value: `${data.metrics.totalEmissions} t`, icon: MapPinned, color: '#a78bfa', background: 'rgba(167,139,250,.1)', glow: 'rgba(167,139,250,.08)' },
    { label: 'Saved routes', value: data.metrics.savedRoutes, icon: Route, color: '#34d399', background: 'rgba(52,211,153,.1)', glow: 'rgba(52,211,153,.08)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="section-kicker">City snapshot</div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Mobility at a glance</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">Key indicators for traffic, fleet activity, and city movement.</p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-400 sm:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
          Demonstration metrics
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon, color, background, glow }) => (
          <div key={label} className="card stat-card" style={{ '--stat-color': color, '--stat-bg': background, '--stat-glow': glow }}>
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-400">{label}</div>
                <div className="mt-5 text-3xl font-bold tracking-tight text-white">{value}</div>
              </div>
              <div className="stat-icon"><Icon size={20} strokeWidth={1.8} /></div>
            </div>
            <div className="relative z-10 mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">City operations</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="card xl:col-span-2">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-slate-100">Traffic condition</div>
              <p className="mt-1 text-xs text-slate-500">Indicative congestion levels throughout the day</p>
            </div>
            <span className="rounded-lg border border-white/[0.07] px-2.5 py-1 text-[11px] text-slate-400">Today</span>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trafficTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.34}/><stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,.12)" strokeDasharray="4 5" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 11 }} />
                <Tooltip {...chartTooltip} />
                <Area type="monotone" dataKey="value" name="Congestion" stroke="#5eead4" fill="url(#trafficFill)" strokeWidth={2.5} activeDot={{ r: 5, fill: '#5eead4', stroke: '#0b1220', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="mb-5">
            <div className="text-base font-semibold text-slate-100">Fleet utilization</div>
            <p className="mt-1 text-xs text-slate-500">Vehicle status distribution</p>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.utilization} dataKey="value" nameKey="name" innerRadius={62} outerRadius={94} paddingAngle={4} stroke="none">
                  {data.utilization.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}
                </Pie>
                <Tooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
            {data.utilization.map((entry, index) => (
              <span key={entry.name} className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                {entry.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="card">
          <div className="mb-5">
            <div className="text-base font-semibold text-slate-100">Emissions trend</div>
            <p className="mt-1 text-xs text-slate-500">Estimated emissions by day</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.emissionsTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="rgba(148,163,184,.12)" strokeDasharray="4 5" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 11 }} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="emissions" name="Emissions" fill="#60a5fa" radius={[6, 6, 0, 0]} maxBarSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="mb-5">
            <div className="text-base font-semibold text-slate-100">Mobility insights</div>
            <p className="mt-1 text-xs text-slate-500">Highlights from the demonstration dataset</p>
          </div>
          <ul className="space-y-3">
            {data.insights.map((item, index) => (
              <li key={item.title} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-400/[0.08] text-xs font-bold text-teal-200">0{index + 1}</span>
                <div>
                  <div className="font-semibold text-slate-200">{item.title}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
