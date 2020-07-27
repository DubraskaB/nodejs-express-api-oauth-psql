let userDB;
let tokenDB;

module.exports = (injectedUserDB, injectedTokenDB) => {
    userDB = injectedUserDB;
    tokenDB = injectedTokenDB;

    return {
        getClient: getClient,
        saveAccessToken: saveAccessToken,
        getUser: getUser,
        grantTypeAllowed: grantTypeAllowed,
        getAccessToken: getAccessToken,
    };
};

function getClient(clientID, clientSecret, callback) {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null,
    };

    callback(false, client);
}

function grantTypeAllowed(clientID, grantType, callback) {
    callback(false, true);
}

function getUser(username, password, callback) {
    userDB.getUser(username, password, callback);
}

function saveAccessToken(accessToken, clientID, expires, user, callback) {
    tokenDB.saveAccessToken(accessToken, user.id, callback);
}

function getAccessToken(bearerToken, callback) {
    tokenDB.getUserIDFromBearerToken(bearerToken, (userID) => {
        const accessToken = {
            user: {
                id: userID,
            },
            expires: null,
        };

        callback(userID === null, userID === null ? null : accessToken);
    });
}
