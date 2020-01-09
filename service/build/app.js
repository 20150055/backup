"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const path = require("path");
const fs = require("fs");
require("./scheduling");
const routes = require("./routes");
const ApiResponse_1 = require("./ApiResponse");
const types_1 = require("./shared/types");
const sqliteConnection_1 = require("./sqliteConnection");
const update_1 = require("./update");
const http = require("http");
const https = require("https");
const sio = require("socket.io");
const constants_1 = require("./constants");
const downloadRestic_1 = require("./util/downloadRestic");
const scheduling_1 = require("./scheduling");
const log_1 = require("./util/log");
const app = express();
exports.app = app;
var server = http.createServer(app);
// allow every origin to access the api
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, HEAD, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Userid");
    next();
});
app.use(express.json());
// Routes
app.use("", routes.router);
// Error handler
app.use((err, req, res, next) => {
    let errorstring = err.message.toString();
    let errormessage = [
        {
            name: errorstring,
            type: types_1.MessageType.error
        }
    ];
    ApiResponse_1.sendResponse(res, 400, { messages: errormessage });
});
// start server (check which directory to use)
let dir;
if (fs.existsSync(path.join(__dirname, "gui"))) {
    dir = path.join(__dirname, "gui"); // check if gui is in src folder
}
else if (fs.existsSync(path.join(path.dirname(__dirname), "gui"))) {
    dir = path.join(path.dirname(__dirname), "gui"); // check if gui is in service folder
}
else {
    dir = path.join(path.dirname(path.dirname(__dirname)), "gui", "dist"); // use gui folder of project directory
}
app.use("/", express.static(path.resolve(dir))); // resolve transforms relative paths to absolute paths
app.use("/api", (req, res, next) => {
    if (["GET", "POST", "PUT", "PATCH", "DELETE"].indexOf(req.method) !== -1) {
        res
            .status(404)
            .json({ messages: [{ name: "api.error.endpoint-not-found" }] }); // send a 404 for every /api route instead of serving a html page
    }
    else {
        next();
    }
});
// If the /handler could not be found ... redirect to index.html
app.use("*", (req, res) => {
    res.sendFile(path.resolve(dir + "/index.html"));
});
exports.io = sio(server);
exports.io.of("/api/").on("connection", socket => {
    console.log("connected");
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});
exports.bootstrap = () => __awaiter(this, void 0, void 0, function* () {
    yield sqliteConnection_1.externCreateConnection();
    yield constants_1.getServerLogfilePath(); // creates initial logfile
    const settings = yield sqliteConnection_1.database.loadGlobalSettingsById(1);
    const admin = yield sqliteConnection_1.database.loadAdminById(1);
    if (!settings) {
        yield sqliteConnection_1.database.createDefaultGlobalSettingsById();
    }
    if (!admin) {
        yield sqliteConnection_1.database.createAdmin();
    }
    yield downloadRestic_1.updateRestic();
    if (constants_1.curEnv === constants_1.Env.prod) {
        update_1.checkForUpdate();
        scheduling_1.checkForBackups();
    }
    else {
        log_1.log.devOnly("not in production, skipping update checks and backup scheduling");
    }
    yield exports.delay(30000);
});
exports.start = () => __awaiter(this, void 0, void 0, function* () {
    const settings = yield sqliteConnection_1.database.loadGlobalSettingsById(1);
    const port = (settings && settings.port) || 8380; // fallback to 8380
    // serverstart on port XXXX
    server.listen(port, function () {
        console.log(`API is listening on port ${port}`);
    });
    if (constants_1.curEnv == constants_1.Env.dev && !(fs.existsSync(path.join(__dirname, 'key.key')) && fs.existsSync(path.join(__dirname, 'cert.cert')))) {
        fs.writeFileSync(path.join(__dirname, 'key.key'), "");
        fs.writeFileSync(path.join(__dirname, 'cert.cert'), "");
    }
    console.log(path.join(__dirname, 'key.key'));
    var privateKey = fs.readFileSync(path.join(__dirname, 'key.key'), 'utf8');
    var certificate = fs.readFileSync(path.join(__dirname, 'cert.cert'), 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    var httpsServer = https.createServer(credentials, app);
    console.log(__dirname);
    httpsServer.listen(3000, function () {
        console.log("https works");
    });
});
exports.delay = function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
//# sourceMappingURL=app.js.map