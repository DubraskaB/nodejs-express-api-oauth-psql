module.exports = {
    query: sqlQuery,
};

const Pool = require("pg").Pool;

function sqlQuery(sqlString, callback) {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "postgres",
        port: 5432,
    });

    pool.query(sqlString, (err, results) => {
        callback(setResponse(err, results));
    });
}

function setResponse(err, results) {
    return {
        error: err,
        results: results ? results : null,
    };
}