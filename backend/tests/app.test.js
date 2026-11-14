import { describe, expect, it } from 'vitest';
import request from 'supertest';
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
});
