import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { getTrafficData } from '../services/traffic.service';
import 'leaflet/dist/leaflet.css';

const congestionColors = {
  low: '#22c55e',
  moderate: '#facc15',
  heavy: '#f97316',
  severe: '#ef4444'
};

export default function Traffic() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTrafficData();
        setObservations(data.observations || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-slate-200">Loading traffic map…</div>;

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Traffic intelligence map</h2>
          <div className="badge">Demonstration data</div>
        </div>
        <div className="h-[520px] overflow-hidden rounded-2xl border border-slate-700">
          <MapContainer center={[12.9716, 77.5946]} zoom={12} scrollWheelZoom className="h-full w-full">
            <TileLayer url={import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} attribution="&copy; OpenStreetMap contributors" />
            {observations.map((point) => (
              <CircleMarker key={point.id} center={[point.latitude, point.longitude]} radius={12} pathOptions={{ color: congestionColors[point.level], fillColor: congestionColors[point.level], fillOpacity: 0.9 }}>
                <Popup>
                  <div>
                    <strong>{point.name}</strong>
                    <div>{point.level} congestion</div>
                    <div>{point.velocity} km/h</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
