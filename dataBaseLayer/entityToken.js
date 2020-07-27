let postgresPool;

module.exports = (injectedPostgresPool) => {
    postgresPool = injectedPostgresPool;

    return {
        saveAccessToken: saveAccessToken,
        getUserIDFromBearerToken: getUserIDFromBearerToken,
    };
};

function saveAccessToken(accessToken, userID, callback) {
    const getUserQuery = `INSERT INTO access_tokens (access_token, user_id) VALUES ('${accessToken}', ${userID});`;

    postgresPool.query(getUserQuery, (response) => {
        callback(response.error);
    });
}

function getUserIDFromBearerToken(bearerToken, callback) {
    const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`;

    postgresPool.query(getUserIDQuery, (response) => {
        const userID =
            response.results && response.results.rowCount == 1
                ? response.results.rows[0].user_id
                : null;

        callback(userID);
    });
}
