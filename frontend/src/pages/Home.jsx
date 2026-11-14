import { Link } from 'react-router-dom';
import { ArrowRight, MapPinned, Route, Zap, Users } from 'lucide-react';

const features = [
  { icon: MapPinned, title: 'Live mobility insights', text: 'Monitor traffic hotspots, incidents, route congestion, and fleet performance in one smart city view.' },
  { icon: Route, title: 'AI route optimization', text: 'Rebalance commutes and deliveries using speed, emission, and safety-aware route scoring.' },
  { icon: Zap, title: 'Predictive operations', text: 'Model congestion risk, forecast delay, and prioritize interventions using historical and observed data.' },
  { icon: Users, title: 'Connected stakeholders', text: 'Support commuters, fleet operators, and city administrators with role-aware dashboards.' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="text-xl font-semibold">SmartMove AI</div>
        <div className="flex gap-3">
          <Link className="btn btn-secondary" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/register">Register</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="badge mb-4">AI for Smart Mobility</span>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Intelligent urban mobility for every route.</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">Reduce congestion, improve safety, and minimize emissions with predictive analytics, optimized routing, and citywide visibility.</p>
            <div className="mt-8 flex gap-4">
              <Link className="btn btn-primary" to="/register">Get started <ArrowRight className="ml-2" size={18} /></Link>
              <Link className="btn btn-secondary" to="/dashboard">View demo dashboard</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-600/30 to-teal-500/20 p-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
              <div className="flex items-center justify-between text-sm text-slate-300"><span>Congestion index</span><span className="text-teal-300">68%</span></div>
              <div className="mt-4 h-3 rounded-full bg-slate-800"><div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-yellow-400 to-red-500" /></div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="card"><div className="text-slate-400">Avg speed</div><div className="mt-3 text-3xl font-bold">31 km/h</div></div>
                <div className="card"><div className="text-slate-400">CO₂ saved</div><div className="mt-3 text-3xl font-bold">1.8 t</div></div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card">
              <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-300"><Icon size={22} /></div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
