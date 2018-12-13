import "reflect-metadata";
import * as express from "express";
import * as path from "path";
import * as fs from "fs";

import { database } from "./sqliteConnection";
import userHandler from "./apiUser";
import "./scheduling";

const app = express();

// allow every origin to access the api
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

app.use("/api/user", userHandler);

// start server (check which directory to use)
let dir;
if (fs.existsSync("./gui")) {
    dir = "./gui";
} else {
    dir = path.join(path.dirname(path.dirname(__dirname)), "gui", "dist");
}
app.use("/", express.static(path.resolve(dir))); // resolve transforms relative paths to absolute paths

app.use("/api", (req, res, next) => {
    if(["GET", "POST", "PUT", "PATCH", "DELETE"].indexOf(req.method) !== -1)
        res.status(404).json({
            messages: [
                {
                    name: "api.error.endpoint-not-found"
                }
            ]
        }); // send a 404 for every /api route instead of serving a html page
    else
        next()
});  

// If the /handler could not be found ... redirect to index.html
app.use("*", (req, res) => {
    res.sendFile(path.resolve(dir + "/index.html"));
});

// serverstart on port XXXX
const port = 8380;
app.listen(port, function() {
  console.log(`API is listening on port ${port}`);
});

// // generate some example data
// setTimeout(createExampleData,1000);




async function createExampleData(){
    await database.create_Local_SFTP_Repository("Local", "Test2", "test2", "D:/#Trash/Test2Repo"),
    await database.create_Local_SFTP_Repository("Local", "Test1", "test1", "D:/#Trash/TestRepo")
    await database.createBackupjob(1, "MyBackup", 10, 60, "Always send emails", "E:\\Schule\\1AHIF\\E;E:\\Schule\\1AHIF\\HTML\\Pong");
    await database.createScheduledBackup(1, 2, new Date(Date.now()), true, false, false, false, false, false, false );
}
