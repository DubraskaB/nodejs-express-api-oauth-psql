let userDB;

module.exports = (injectedUserDB) => {
    userDB = injectedUserDB;

    return {
        registerUser: registerUser,
        login: login,
    };
};

function registerUser(req, resp) {
    userDB.isValidUser(req.body.username, (error, isValidUser) => {
        if (error || !isValidUser) {
            const message = error
                ? "Ha ocurrido un error!"
                : "Este usuario ya existe!";

            sendResponse(resp, message, error);

            return;
        }

        userDB.register(req.body.username, req.body.password, (response) => {
            sendResponse(
                resp,
                response.error === undefined ? "Registro exitoso!" : "Ha ocurrido un error!",
                response.error
            );
        });
    });
}

function login(query, resp) {}

function sendResponse(resp, message, error) {
    resp.status(error !== undefined ? 400 : 200).json({
        message: message,
        error: error,
    });
}
