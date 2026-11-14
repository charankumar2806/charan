# SmartMove AI

SmartMove AI is a full-stack smart-mobility platform for commuters, fleet operators, and city administrators. It provides dashboard analytics, route optimization, traffic prediction, fleet tracking, incident reporting, transit insight, and an AI assistant with Gemini-powered explanation while keeping the API layer and data access separated.

## Features

- Smart city dashboard with realtime-style analytics
- Traffic monitoring and prediction
- Route optimization with OSRM demo integration
- Fleet management and emissions modeling
- Road safety incident reporting
- Transit analytics and recommendations
- AI mobility assistant with Gemini-safe fallback behavior
- Authentication, authorization, and protected API endpoints
- PostgreSQL migration layout for Supabase-ready integration

## Stack

- Frontend: React + Vite + Tailwind + React Router + Recharts + Leaflet
- Backend: Express + PostgreSQL + JWT + Zod + Helmet + CORS + rate limiting
- AI: Google Gemini via @google/genai
- Maps/Routing: OpenStreetMap + Leaflet + OSRM

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure backend environment:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Configure frontend environment:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
4. Start both apps:
   ```bash
   npm run dev
   ```
5. Open the frontend at http://localhost:5173 and backend at http://localhost:5000.

## Environment files

See `backend/.env.example` and `frontend/.env.example` for required variables.

## Database setup

- Create a Supabase PostgreSQL project.
- Copy the database connection string into `backend/.env` as `DATABASE_URL`.
- Run migrations:
  ```bash
  npm run db:migrate
  ```
- Seed demo data:
  ```bash
  npm run db:seed
  ```

## Testing

```bash
npm test
```

## Documentation

See `docs/` for architecture, deployment, testing, and API reference.

## Notes

This project intentionally supports demo-mode fallback when external services are not configured. Real Gemini or Supabase credentials are required for live integration.
