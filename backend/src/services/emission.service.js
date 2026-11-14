export const emissionFactors = {
  petrol: 2.31,
  diesel: 2.68,
  electric: 0.08,
  hybrid: 1.12
};

export const calculateEmissions = ({ distanceKm = 10, fuelType = 'petrol', vehicleType = 'car' }) => {
  const factor = emissionFactors[fuelType] || 1.8;
  const baseWeight = vehicleType === 'bus' ? 1.4 : vehicleType === 'bicycle' ? 0.12 : 1.0;
  const totalKg = Number((distanceKm * factor * baseWeight).toFixed(1));
  return {
    totalKg,
    perKm: Number((totalKg / Math.max(distanceKm, 1)).toFixed(2)),
    savings: fuelType === 'electric' ? 26 : 12,
    assumptions: [
      'Emission estimates are calculated using configurable heuristic factors for vehicle type and fuel type.',
      'These figures are operational estimates rather than laboratory-grade measurements.',
      'Results should be used for planning and recommendation, not regulatory reporting.'
    ]
  };
};
