import { demoUsers, demoVehicles, demoNotifications, demoIncidents, demoTransitRoutes, demoTransitStops } from '../utils/demo-data.js';

const seed = async () => {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not configured. Skipping seed operation.');
    return;
  }

  console.log('Database seeding requires a configured PostgreSQL connection and is intentionally not run in demo mode.');
  console.log('Demo seed payload available:', {
    users: demoUsers.length,
    vehicles: demoVehicles.length,
    notifications: demoNotifications.length,
    incidents: demoIncidents.length,
    transitRoutes: demoTransitRoutes.length,
    transitStops: demoTransitStops.length,
  });
};

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
