import { describe, expect, it } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app.js';

describe('SmartMove AI backend', () => {
  it('returns an ok health response', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('registers a user and returns a token', async () => {
    const email = `user-${Date.now()}@smartmove.ai`;
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Demo Rider',
        email,
        password: 'demo-pass-123',
        role: 'commuter',
      });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user.email).toBe(email);
  });

  it('serves transit routes and stops to authenticated users', async () => {
    const token = jwt.sign(
      { id: 'user-1', email: 'admin@smartmove.ai', role: 'administrator' },
      process.env.JWT_SECRET || 'demo-secret'
    );

    const [routesResponse, stopsResponse] = await Promise.all([
      request(app).get('/api/v1/transit/routes').set('Authorization', `Bearer ${token}`),
      request(app).get('/api/v1/transit/stops').set('Authorization', `Bearer ${token}`),
    ]);

    expect(routesResponse.status).toBe(200);
    expect(routesResponse.body.routes.length).toBeGreaterThan(0);
    expect(stopsResponse.status).toBe(200);
    expect(stopsResponse.body.stops.length).toBeGreaterThan(0);
  });

  it('serves emission summaries and calculates emissions for authenticated users', async () => {
    const token = jwt.sign(
      { id: 'user-1', email: 'admin@smartmove.ai', role: 'administrator' },
      process.env.JWT_SECRET || 'demo-secret'
    );

    const summaryResponse = await request(app)
      .get('/api/v1/emissions/summary')
      .set('Authorization', `Bearer ${token}`);
    const calculationResponse = await request(app)
      .post('/api/v1/emissions/calculate')
      .set('Authorization', `Bearer ${token}`)
      .send({ distanceKm: 20, fuelType: 'electric', vehicleType: 'car' });

    expect(summaryResponse.status).toBe(200);
    expect(summaryResponse.body.assumptions.length).toBeGreaterThan(0);
    expect(calculationResponse.status).toBe(200);
    expect(calculationResponse.body.totalKg).toBe(1.6);
    expect(calculationResponse.body.savings).toBe(26);
  });
});
