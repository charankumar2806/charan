export const predictTraffic = ({ vehicleCount = 700, averageSpeed = 38, historicalTraffic = 45, timeOfDay = '18:00', dayOfWeek = 'Wednesday', weather = 'Clear' }) => {
  const timeFactor = timeOfDay.includes('18') ? 1.2 : timeOfDay.includes('08') ? 1.1 : 1.0;
  const weekdayFactor = dayOfWeek === 'Friday' || dayOfWeek === 'Saturday' ? 1.15 : 1.0;
  const weatherFactor = weather.toLowerCase().includes('rain') ? 1.18 : 1.0;
  const congestion = Math.min(95, Math.max(12, Math.round((vehicleCount / 2000) * 100 * timeFactor * weekdayFactor * weatherFactor * 0.9 + historicalTraffic * 0.6)));
  const speed = Math.max(12, Math.round((averageSpeed * 0.8) + (100 - congestion) * 0.18));
  const delay = Math.max(3, Math.round((100 - speed) * 0.8 + congestion * 0.15));
  const risk = congestion > 70 ? 'High' : congestion > 50 ? 'Moderate' : 'Low';

  return {
    source: 'historical model',
    congestion,
    speed,
    delay,
    risk,
    recommendation: `Use signal timing changes or feeder transit priority to reduce congestion at ${timeOfDay} on ${dayOfWeek}.`,
    basis: 'This estimate is calculated using historical averages, observed traffic intensity, and weather conditions. It is not a live traffic feed.'
  };
};
