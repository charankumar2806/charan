export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><div className="text-sm text-slate-400">System health</div><div className="mt-3 text-3xl font-bold">96%</div></div>
        <div className="card"><div className="text-sm text-slate-400">Open reports</div><div className="mt-3 text-3xl font-bold">18</div></div>
        <div className="card"><div className="text-sm text-slate-400">Admin actions</div><div className="mt-3 text-3xl font-bold">12</div></div>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Operations review</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">Traffic flow normalized after rerouting three delivery corridors.</li>
          <li className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">Safety team reviewed three high-risk flood reports and scheduled maintenance.</li>
          <li className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">AI recommendations favor transit priority on Bomanahalli Corridor.</li>
        </ul>
      </div>
    </div>
  );
}
