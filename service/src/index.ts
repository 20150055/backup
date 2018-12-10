import "reflect-metadata";
import * as express from "express";
import * as path from "path";
import * as fs from "fs";

import { database } from "./sqliteConnection";
import userHandler from "./apiUser";
import "./scheduling";

const app = express();

app.use(express.json());

app.use("/api/user", userHandler);

// start server (check which directory to use)
let dir;
if(fs.existsSync("./gui")){
    dir = "./gui";
}else{
    dir = path.join(path.dirname(path.dirname(__dirname)), "gui", "dist");
}
app.use("/", express.static(dir));

// If the /handler could not be found ... redirect to index.html
app.use("*", (req, res) => {
    res.sendFile(dir + "/index.html");
});

// serverstart on port XXXX
const port = 8008;
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
