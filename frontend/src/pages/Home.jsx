import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ArrowUpRight, Bot, Bus, MapPinned, Route, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const features = [
  { icon: MapPinned, title: 'See the whole city', text: 'Bring traffic hotspots, incidents, routes, and fleet activity into one clear operations view.', color: 'text-teal-200', background: 'bg-teal-400/[0.09]' },
  { icon: Route, title: 'Make routes smarter', text: 'Compare journeys with travel time, vehicle needs, and estimated emissions in mind.', color: 'text-blue-200', background: 'bg-blue-400/[0.09]' },
  { icon: Zap, title: 'Anticipate congestion', text: 'Use transparent historical estimates to spot pressure points and plan interventions.', color: 'text-amber-200', background: 'bg-amber-400/[0.09]' },
  { icon: Bus, title: 'Connect mobility teams', text: 'Give commuters, fleet operators, and city teams a shared operational workspace.', color: 'text-violet-200', background: 'bg-violet-400/[0.09]' },
];

export default function Home() {
  return (
    <div className="home-shell min-h-screen text-white">
      <div className="hero-orb -right-36 -top-40" />
      <div className="hero-orb -bottom-48 -left-40 !bg-blue-500/10" />
      <header className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="brand-mark grid h-11 w-11 place-items-center rounded-2xl text-lg font-black text-slate-950">S</div>
          <div>
            <div className="font-bold tracking-tight">SmartMove AI</div>
            <div className="text-[11px] text-slate-500">Urban mobility intelligence</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a className="transition hover:text-white" href="#capabilities">Capabilities</a>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Demo environment</span>
        </nav>
        <div className="flex gap-2 sm:gap-3">
          <Link className="btn btn-secondary !px-3 sm:!px-4" to="/login">Sign in</Link>
          <Link className="btn btn-primary !px-3 sm:!px-4" to="/register">Get started <ArrowRight size={16} /></Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-8 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="badge mb-6"><Sparkles size={14} /> AI for smarter city movement</div>
            <h1 className="text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Move your city
              <span className="mt-1 block bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">forward.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              A clearer view of urban mobility. Explore traffic, optimize routes, and help city teams make confident, data-informed decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary px-5 py-3" to="/register">Explore SmartMove <ArrowRight size={17} /></Link>
              <Link className="btn btn-secondary px-5 py-3" to="/dashboard">View dashboard <ArrowUpRight size={17} /></Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-teal-300" /> Role-aware workspace</span>
              <span className="inline-flex items-center gap-2"><Activity size={15} className="text-blue-300" /> Demo data clearly labeled</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-teal-400/10 via-blue-500/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-teal-400/[0.08] blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-500">City movement index</div>
                  <div className="mt-2 text-sm text-slate-300">Urban mobility snapshot</div>
                </div>
                <span className="badge !px-2.5 !py-1"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Demo</span>
              </div>
              <div className="relative mt-7 rounded-2xl border border-white/[0.07] bg-slate-950/60 p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Congestion index</div>
                    <div className="mt-2 text-5xl font-bold tracking-tight text-white">68<span className="text-2xl text-slate-500">%</span></div>
                  </div>
                  <div className="mb-1 rounded-xl border border-teal-300/10 bg-teal-300/[0.07] p-3 text-teal-200"><Activity size={22} /></div>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-slate-600"><span>Low</span><span>Elevated</span><span>High</span></div>
              </div>
              <div className="relative mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="text-xs text-slate-500">Average speed</div>
                  <div className="mt-2 text-2xl font-bold text-white">31 <span className="text-sm font-medium text-slate-500">km/h</span></div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="text-xs text-slate-500">CO₂ saved</div>
                  <div className="mt-2 text-2xl font-bold text-white">1.8 <span className="text-sm font-medium text-slate-500">tonnes</span></div>
                </div>
              </div>
              <div className="relative mt-3 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-400/[0.09] text-blue-200"><Bot size={19} /></div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-200">Mobility intelligence</div>
                  <div className="mt-1 truncate text-xs text-slate-500">Insights for better city operations</div>
                </div>
                <ArrowUpRight size={17} className="text-slate-600" />
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="mt-24 scroll-mt-12 sm:mt-32">
          <div className="mb-7 max-w-2xl">
            <div className="section-kicker">Built for better movement</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">One connected view of the city.</h2>
            <p className="mt-3 text-slate-400">Tools to turn mobility signals into practical decisions.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map(({ icon: Icon, title, text, color, background }) => (
              <div key={title} className="card group min-h-52">
                <div className={`mb-5 inline-grid h-11 w-11 place-items-center rounded-xl ${background} ${color}`}><Icon size={20} /></div>
                <h3 className="text-base font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="relative border-t border-white/[0.06] px-5 py-6 text-center text-xs text-slate-600">
        SmartMove AI <span className="mx-2 text-slate-800">·</span> Urban mobility intelligence
      </footer>
    </div>
  );
}
