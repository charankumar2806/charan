import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error);
});

export const query = async (text, params = []) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured. Add your Supabase PostgreSQL connection string to backend/.env.');
  }
  return pool.query(text, params);
};

export const testDatabaseConnection = async () => {
  if (!process.env.DATABASE_URL) {
    return { ok: false, message: 'DATABASE_URL is missing. Live database testing was skipped because no Supabase connection string was configured.' };
  }

  try {
    const result = await pool.query('SELECT NOW() as now');
    return { ok: true, message: 'Database connection successful', timestamp: result.rows[0].now };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const closePool = async () => {
  await pool.end();
};
