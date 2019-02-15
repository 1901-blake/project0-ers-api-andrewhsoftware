import { Pool } from 'pg'

export const ConnectionPool = new Pool({
    user: 'andrewHSoftware',
    host: 'revaturedb.c2hyt8zbbd2u.us-east-2.rds.amazonaws.com' || 'localhost',
    database: 'postgres',
    password: 'WeAreTheKnightsWhoSayNi1237',
    port: 5432,
    max: 20
});
