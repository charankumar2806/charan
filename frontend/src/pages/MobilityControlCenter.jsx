export default function MobilityControlCenter() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Smart City Mobility Control Center</h2>
        <p className="mt-2 text-slate-300">Daily AI mobility report based on observed conditions and demonstration data.</p>
        <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-4 text-sm text-teal-100">
          Today’s mobility analysis indicates increased congestion in monitored road segments. Review the reported incidents and consider alternative routes. Estimated emissions can potentially be reduced through improved route selection.
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card"><div className="text-sm text-slate-400">Hotspots</div><div className="mt-3 text-2xl font-bold">7</div></div>
        <div className="card"><div className="text-sm text-slate-400">Transit incidents</div><div className="mt-3 text-2xl font-bold">4 delays</div></div>
        <div className="card"><div className="text-sm text-slate-400">Fleet utilization</div><div className="mt-3 text-2xl font-bold">74%</div></div>
      </div>
    </div>
  );
}
