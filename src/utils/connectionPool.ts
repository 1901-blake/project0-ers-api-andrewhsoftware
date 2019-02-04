import { Pool } from 'pg'

export const ConnectionPool = new Pool({
    user: process.env.PostGresUser,
    host: process.env.PostGresHostURL || 'localhost',
    database: process.env.PostGresDatabase,
    password: process.env.PostGresPassword,
    port: 5432,
    max: 20
});