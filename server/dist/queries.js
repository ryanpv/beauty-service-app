import pg from 'pg';
const Pool = pg.Pool;
export const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.NODE_ENV === 'development' ? process.env.PSQL_LOCALHOST : process.env.PSQL_PRODHOST,
    database: 'beauty_service_app',
    password: process.env.PSQL_PASSWORD,
    port: parseInt(process.env.PSQL_PORT),
});
//# sourceMappingURL=queries.js.map