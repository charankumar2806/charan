import { testDatabaseConnection } from '../config/database.js';

const check = async () => {
  const result = await testDatabaseConnection();
  console.log(JSON.stringify(result, null, 2));
};

check().catch((error) => {
  console.error('Database check failed:', error.message);
  process.exit(1);
});
