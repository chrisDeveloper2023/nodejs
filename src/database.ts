import {Pool} from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'passwd',
    database: 'typescriptdatabase',
    port: 5432
});