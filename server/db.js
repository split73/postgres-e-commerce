const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "anisoft",
    host: "localhost",
    port: "5432",
    database: "guitar_store_ecomerce"
});

module.exports = pool