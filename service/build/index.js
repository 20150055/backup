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
const sqliteConnection_1 = require("./sqliteConnection");
const apiUser_1 = require("./apiUser");
require("./scheduling");
const app = express();
// allow every origin to access the api
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use("/api/user", apiUser_1.default);
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
    if (["GET", "POST", "PUT", "PATCH", "DELETE"].indexOf(req.method) !== -1)
        res.status(404).json({
            messages: [
                {
                    name: "api.error.endpoint-not-found"
                }
            ]
        }); // send a 404 for every /api route instead of serving a html page
    else
        next();
});
// If the /handler could not be found ... redirect to index.html
app.use("*", (req, res) => {
    res.sendFile(path.resolve(dir + "/index.html"));
});
// serverstart on port XXXX
const port = 8380;
app.listen(port, function () {
    console.log(`API is listening on port ${port}`);
});
// // generate some example data
// setTimeout(createExampleData,1000);
function createExampleData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sqliteConnection_1.database.create_Local_SFTP_Repository("Local", "Test2", "test2", "D:/#Trash/Test2Repo"),
            yield sqliteConnection_1.database.create_Local_SFTP_Repository("Local", "Test1", "test1", "D:/#Trash/TestRepo");
        yield sqliteConnection_1.database.createBackupjob(1, "MyBackup", 10, 60, "Always send emails", "E:\\Schule\\1AHIF\\E;E:\\Schule\\1AHIF\\HTML\\Pong");
        yield sqliteConnection_1.database.createScheduledBackup(1, 2, new Date(Date.now()), true, false, false, false, false, false, false);
    });
}
//# sourceMappingURL=index.js.map