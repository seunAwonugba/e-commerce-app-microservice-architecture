const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB_DEV,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

module.exports = { pool };
