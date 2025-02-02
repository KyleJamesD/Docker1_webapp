import { Pool } from 'pg';
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // use host: localhost,  for when running outside of a container
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

export default pool;
