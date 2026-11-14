export const demoUsers = [
  { id: 'user-1', name: 'Aisha Rao', email: 'admin@smartmove.ai', password: 'demo-pass-123', role: 'administrator' },
  { id: 'user-2', name: 'Rahul Nair', email: 'operator@smartmove.ai', password: 'demo-pass-123', role: 'operator' }
];

export const demoVehicles = [
  { id: 'veh-1', registration: 'KA-09-MB-9821', model: 'Electric Van', status: 'active', fuelType: 'electric', efficiency: 5.4, assignedRoute: 'Delivery route A' },
  { id: 'veh-2', registration: 'KA-05-AB-3312', model: 'Hybrid Bus', status: 'idle', fuelType: 'hybrid', efficiency: 4.6, assignedRoute: 'Transit corridor' },
  { id: 'veh-3', registration: 'KA-01-TR-5100', model: 'Sedan', status: 'maintenance', fuelType: 'petrol', efficiency: 3.8, assignedRoute: 'City loop' }
];

export const dashboardOverview = {
  metrics: {
    monitoredVehicles: 1248,
    activeIncidents: 17,
    averageTrafficSpeed: 31,
    congestionPercentage: 68,
    totalEmissions: 3.4,
    savedRoutes: 94,
    fleetUtilization: 74
  },
  trafficTrend: [
    { time: '06:00', value: 40 },
    { time: '08:00', value: 62 },
    { time: '10:00', value: 72 },
    { time: '12:00', value: 58 },
    { time: '14:00', value: 69 },
    { time: '16:00', value: 80 },
    { time: '18:00', value: 76 },
    { time: '20:00', value: 52 }
  ],
  utilization: [
    { name: 'Active', value: 45 },
    { name: 'Idle', value: 25 },
    { name: 'Maintenance', value: 18 },
    { name: 'Offline', value: 12 }
  ],
  emissionsTrend: [
    { day: 'Mon', emissions: 2.1 },
    { day: 'Tue', emissions: 2.4 },
    { day: 'Wed', emissions: 2.8 },
    { day: 'Thu', emissions: 2.2 },
    { day: 'Fri', emissions: 3.0 },
    { day: 'Sat', emissions: 2.6 }
  ],
  insights: [
    { title: 'Congestion hotspot', detail: 'Outer Ring Road shows elevated vehicle density during evening peak.' },
    { title: 'Emission opportunity', detail: 'Transit and electric fleets reduce carbon intensity along central corridors.' },
    { title: 'Safety review', detail: 'Three flood reports and one road-works report remain active.' }
  ]
};

export const trafficObservations = [
  { id: 'obs-1', name: 'Outer Ring Road', latitude: 12.9716, longitude: 77.5946, level: 'heavy', velocity: 26 },
  { id: 'obs-2', name: 'MG Road', latitude: 12.9753, longitude: 77.5943, level: 'moderate', velocity: 34 },
  { id: 'obs-3', name: 'Whitefield', latitude: 12.9698, longitude: 77.7499, level: 'severe', velocity: 22 },
  { id: 'obs-4', name: 'Koramangala', latitude: 12.9352, longitude: 77.6245, level: 'low', velocity: 41 }
];

export const demoNotifications = [
  { id: 'not-1', title: 'Route warning', message: 'Outer Ring Road congestion is 18% above normal for the next hour.', read: false },
  { id: 'not-2', title: 'Fleet health', message: 'Two vehicles require preventive maintenance review.', read: true },
  { id: 'not-3', title: 'Transit update', message: 'Metro feeder route has a 7-minute delay from a signal queue.', read: false }
];

export const demoIncidents = [
  { id: 'inc-1', title: 'Flooding on Lake Road', description: 'Water accumulation near the underpass is reducing visibility.', category: 'flooding', severity: 'high', status: 'open', latitude: 12.97, longitude: 77.59 },
  { id: 'inc-2', title: 'Road works on Old Airport Road', description: 'Temporary lane closure for utility repair.', category: 'road construction', severity: 'medium', status: 'review', latitude: 12.96, longitude: 77.64 }
];

export const demoTransitRoutes = [
  { id: 'transit-1', name: 'Metro Corridor A', delay: 7, duration: 38 },
  { id: 'transit-2', name: 'Bus Loop East', delay: 11, duration: 24 }
];

export const demoTransitStops = [
  { id: 'stop-1', name: 'Indiranagar Station', type: 'Metro', serviceLevel: 'High' },
  { id: 'stop-2', name: 'Doddanekkundi Stop', type: 'Bus', serviceLevel: 'Moderate' }
];
