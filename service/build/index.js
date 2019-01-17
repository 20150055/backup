"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const path = require("path");
const fs = require("fs");
const apiUser_1 = require("./apiUser");
const apiSystem_1 = require("./apiSystem");
require("./scheduling");
const app = express();
// allow every origin to access the api
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());
app.use("/api/user", apiUser_1.default);
app.use("/api/system", apiSystem_1.default);
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
        res.status(404).json({ messages: [{ name: "api.error.endpoint-not-found" }] }); // send a 404 for every /api route instead of serving a html page
    }
    else {
        next();
    }
});
// If the /handler could not be found ... redirect to index.html
app.use("*", (req, res) => {
    res.sendFile(path.resolve(dir + "/index.html"));
});
// serverstart on port 8380
const port = 8380;
app.listen(port, function () {
    console.log(`API is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map