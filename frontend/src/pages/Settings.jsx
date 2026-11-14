export default function Settings() {
  return (
    <div className="card max-w-2xl">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-5 space-y-4">
        <label className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/60 p-3"><span>Enable AI recommendations</span><input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/60 p-3"><span>Dark mode</span><input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/60 p-3"><span>Send route alerts</span><input type="checkbox" defaultChecked /></label>
      </div>
    </div>
  );
}
