import { Home, Map, Gauge, Bus, ShieldCheck, Bot, Bell, Settings, LogOut, User, LayoutDashboard, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth.service';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/traffic', label: 'Traffic', icon: Map },
  { to: '/routes', label: 'Routes', icon: Gauge },
  { to: '/fleet', label: 'Fleet', icon: Users },
  { to: '/emissions', label: 'Emissions', icon: ShieldCheck },
  { to: '/transit', label: 'Transit', icon: Bus },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Layout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="w-72 border-r border-slate-800 bg-slate-900/90 p-5">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 font-bold text-white">S</div>
          <div>
            <div className="text-lg font-semibold">SmartMove AI</div>
            <div className="text-xs text-slate-400">Urban mobility intelligence</div>
          </div>
        </div>
        <nav className="space-y-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="btn btn-secondary mt-8 w-full justify-start gap-2">
          <LogOut size={18} />
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Smart City Mobility Platform</h1>
              <p className="text-sm text-slate-400">AI-guided traffic, route, and emissions intelligence</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge">Demo data</span>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200">City operations</span>
            </div>
          </div>
        </div>
        <div className="p-6"><Outlet /></div>
      </main>
    </div>
  );
}
