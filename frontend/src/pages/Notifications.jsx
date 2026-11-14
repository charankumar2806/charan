import { useEffect, useState } from 'react';
import { getNotifications, markRead } from '../services/notification.service';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const { data } = await getNotifications();
    setNotifications(data.notifications || []);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <div className="mt-5 space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{notification.title}</div>
              {!notification.read && <button className="text-sm text-teal-300" onClick={async () => { await markRead(notification.id); loadNotifications(); }}>Mark read</button>}
            </div>
            <div className="mt-2 text-sm text-slate-300">{notification.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
