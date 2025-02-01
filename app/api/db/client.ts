// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'docker1',
//   password: 'password',
//   port: 5432,
// });

// export default pool;


import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

export default pool;


