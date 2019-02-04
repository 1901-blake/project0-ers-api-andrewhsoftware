import { Pool } from 'pg'

export const ConnectionPool = new Pool({
    user: process.env.PostGresUser,
    host: process.env.PostGresHostURL || 'localhost',

})