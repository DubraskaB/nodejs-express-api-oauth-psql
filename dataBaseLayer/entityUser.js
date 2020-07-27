let postgresPool;

module.exports = (injectedPostgresPool) => {
    postgresPool = injectedPostgresPool;

    return {
        register: register,
        getUser: getUser,
        isValidUser: isValidUser,
    };
};
var crypto = require("crypto");

function register(username, password, callback) {
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");

    const query = `INSERT INTO users (username, user_password) VALUES ('${username}', '${shaPass}')`;

    postgresPool.query(query, callback);
}

function getUser(username, password, callback) {
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");

    const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${shaPass}'`;

    postgresPool.query(getUserQuery, (response) => {
        callback(
            false,
            response.results && response.results.rowCount === 1
                ? response.results.rows[0]
                : null
        );
    });
}

function isValidUser(username, callback) {
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    const checkUsrcbFunc = (response) => {
        const isValidUser = response.results
            ? !(response.results.rowCount > 0)
            : null;

        callback(response.error, isValidUser);
    };

    postgresPool.query(query, checkUsrcbFunc);
}
