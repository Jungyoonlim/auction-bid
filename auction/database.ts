import { Pool } from 'pg';

let pool: Pool; 

try {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });
  console.log('Database connection established');
} catch (error) {
  console.error('Error connecting to the database:', error);
  throw error;
}

export default pool;



