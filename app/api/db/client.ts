import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'docker1',
  password: 'password',
  port: 5432,
});

export default pool;


