//Connection DB
const postgresPool = require("./dataBaseLayer/pgConnection");
const userDB = require("./dataBaseLayer/entityUser")(postgresPool);
const tokenDB = require("./dataBaseLayer/entityToken")(postgresPool);

//Oauth2 
const oAuthService = require("./authService/validateToken")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");

//Express
const express = require("express");
const app = express();
app.oauth = oAuth2Server({
    model: oAuthService,
    grants: ["password"],
    debug: true,
});

//Cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Content-Length, Accept-Encoding, X-CSRF-Token, Access-Control-Allow-Request-Method');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const APIController = require("./controller/APIController.js");
const APIRoutes = require("./routes/apiRoutes.js")(
    express.Router(),
    app,
    APIController
);

//AuthService and routes
const authenticator = require("./controller/userAuthController")(userDB);
const routes = require("./routes/routes")(
    express.Router(),
    app,
    authenticator
);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.oauth.errorHandler());
app.use("/auth", routes);
app.use("/api", APIRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


