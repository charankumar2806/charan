import { Activity, Bell, Bot, Bus, Gauge, Home, LayoutDashboard, LogOut, Map, Settings, User, Users } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth.service';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/traffic', label: 'Traffic', icon: Map },
  { to: '/routes', label: 'Routes', icon: Gauge },
  { to: '/fleet', label: 'Fleet', icon: Users },
  { to: '/emissions', label: 'Emissions', icon: Activity },
  { to: '/transit', label: 'Transit', icon: Bus },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
];

const pageDetails = {
  '/dashboard': ['Mobility overview', 'A city-wide snapshot of movement and operations.'],
  '/traffic': ['Traffic intelligence', 'Monitor congestion patterns and road conditions.'],
  '/routes': ['Route optimizer', 'Compare routes with time and emissions in mind.'],
  '/fleet': ['Fleet operations', 'Review vehicle status and utilization.'],
  '/emissions': ['Emissions analytics', 'Understand estimated impact across journeys.'],
  '/transit': ['Public transit', 'Explore transit routes, delays, and stops.'],
  '/ai-assistant': ['Mobility assistant', 'Ask questions about your mobility operations.'],
  '/notifications': ['Notifications', 'Keep track of important operational updates.'],
  '/settings': ['Workspace settings', 'Manage your SmartMove preferences.'],
  '/profile': ['Your profile', 'View your account details.'],
  '/road-safety': ['Road safety', 'Review reported incidents and safety conditions.'],
  '/mobility-control-center': ['Control center', 'Coordinate city-wide mobility operations.'],
  '/admin': ['Administration', 'Manage the SmartMove workspace.'],
  '/traffic-prediction': ['Traffic prediction', 'Explore indicative traffic forecasts.'],
};

export default function Layout() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [title, subtitle] = pageDetails[pathname] || ['SmartMove AI', 'Urban mobility intelligence'];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
    localStorage.removeItem('smartmove_token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app-shell min-h-screen text-slate-100 lg:flex">
      <aside className="app-sidebar border-b border-slate-700/40 px-4 py-4 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[272px] lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="brand-mark grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-black text-slate-950">S</div>
            <div className="min-w-0">
              <div className="truncate text-base font-bold tracking-tight text-white">SmartMove AI</div>
              <div className="mt-0.5 truncate text-[11px] text-slate-500">Urban mobility intelligence</div>
            </div>
          </div>
          <button onClick={handleLogout} aria-label="Log out" className="btn btn-secondary !p-2 lg:hidden">
            <LogOut size={17} />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2 lg:mt-8">
          <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(94,234,212,0.8)]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Demo workspace</span>
        </div>

        <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 lg:mt-8">Workspace</div>
        <nav className="mt-2 flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link shrink-0 lg:w-full ${isActive ? 'sidebar-link-active' : ''}`}>
              <span className="sidebar-icon"><Icon size={17} strokeWidth={1.8} /></span>
              <span className="whitespace-nowrap">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-5 hidden lg:mt-auto lg:block">
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-sm font-bold text-teal-100">
              {user?.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-200">{user?.name || 'SmartMove user'}</div>
              <div className="truncate text-xs capitalize text-slate-500">{user?.role || 'workspace member'}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary w-full justify-start gap-2.5">
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="topbar sticky top-0 z-20 border-b px-5 py-4 sm:px-7 lg:px-9">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="section-kicker mb-1 flex items-center gap-2">
                <Home size={12} />
                <span>City operations</span>
                <span className="text-slate-700">/</span>
                <span className="truncate text-slate-400">{title}</span>
              </div>
              <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h1>
              <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">{subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="badge"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Sample data</span>
            </div>
          </div>
        </header>
        <section className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
