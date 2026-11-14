import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { query } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationDir = path.join(__dirname, '..', '..', 'migrations');

const runMigrations = async () => {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not configured. Skipping live migration run.');
    return;
  }

  const files = fs.readdirSync(migrationDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (!files.length) {
    console.log('No migration files found.');
    return;
  }

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8');
    console.log(`Running migration: ${file}`);
    await query(sql);
  }

  console.log('All migrations completed successfully.');
};

runMigrations().catch((error) => {
  console.error('Migration run failed:', error.message);
  process.exit(1);
});
