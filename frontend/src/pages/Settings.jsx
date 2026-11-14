import { Bell, Bot, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="section-kicker">Preferences</div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Make SmartMove yours</h2>
        <p className="mt-2 text-sm text-slate-400">Choose how your workspace behaves and looks.</p>
      </div>

      <section className="card">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace preferences</h3>
        <div className="mt-4 divide-y divide-slate-700/40">
          <label className="flex cursor-pointer items-center justify-between gap-5 py-4">
            <span className="flex items-center gap-3">
              <span className="setting-icon"><Bot size={18} /></span>
              <span>
                <span className="block font-medium text-slate-100">AI recommendations</span>
                <span className="mt-1 block text-xs text-slate-500">Show mobility suggestions across your workspace.</span>
              </span>
            </span>
            <input className="theme-toggle" type="checkbox" defaultChecked aria-label="Enable AI recommendations" />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-5 py-4">
            <span className="flex items-center gap-3">
              <span className="setting-icon">{darkMode ? <Moon size={18} /> : <Sun size={18} />}</span>
              <span>
                <span className="block font-medium text-slate-100">Dark mode</span>
                <span className="mt-1 block text-xs text-slate-500">Use the dark appearance throughout the app.</span>
              </span>
            </span>
            <input
              className="theme-toggle"
              type="checkbox"
              checked={darkMode}
              onChange={(event) => setDarkMode(event.target.checked)}
              aria-label="Dark mode"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-5 py-4">
            <span className="flex items-center gap-3">
              <span className="setting-icon"><Bell size={18} /></span>
              <span>
                <span className="block font-medium text-slate-100">Route alerts</span>
                <span className="mt-1 block text-xs text-slate-500">Show notifications about route changes.</span>
              </span>
            </span>
            <input className="theme-toggle" type="checkbox" defaultChecked aria-label="Send route alerts" />
          </label>
        </div>
      </section>
    </div>
  );
}
