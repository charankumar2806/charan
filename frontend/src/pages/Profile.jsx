export default function Profile() {
  return (
    <div className="card max-w-2xl">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div><label className="label">Full name</label><input className="input" defaultValue="Aisha Rao" /></div>
        <div><label className="label">Role</label><input className="input" defaultValue="Fleet administrator" /></div>
        <div><label className="label">Email</label><input className="input" defaultValue="aisha@smartmove.ai" /></div>
        <div><label className="label">City</label><input className="input" defaultValue="Bengaluru" /></div>
      </div>
    </div>
  );
}
