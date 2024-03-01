import pg from 'pg';

const Pool = pg.Pool;

export const pool = new Pool({
  user: process.env.NODE_ENV === 'development' ? process.env.PSQL_USER : process.env.PSQL_PRODUSER,
  host: process.env.NODE_ENV === 'development' ? process.env.PSQL_LOCALHOST : process.env.PSQL_PRODHOST,
  database: process.env.NODE_ENV === 'development' ? 'beauty_service_app' : 'beauty_service_app_db',
  password: process.env.NODE_ENV === 'development' ? process.env.PSQL_PASSWORD : process.env.PSQL_PRODPASS,
  port: parseInt(process.env.PSQL_PORT),
  ssl: true
});
