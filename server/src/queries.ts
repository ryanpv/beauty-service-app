import pg from 'pg';

const Pool = pg.Pool;

export const pool = new Pool({
  user: process.env.PSQL_USER,
  host: 'localhost',
  database: 'beauty_service_app',
  password: process.env.PSQL_PASSWORD,
  port: parseInt(process.env.PSQL_PORT),
});
