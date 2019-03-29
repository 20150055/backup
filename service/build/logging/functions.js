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
const sqliteConnection_1 = require("../sqliteConnection");
const fsextra = require("fs-extra");
const path = require("path");
const entity_1 = require("../entity");
function createLog(logArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const globalSettings = yield sqliteConnection_1.database.loadGlobalSettingsById(1);
        let log = setValues(logArgs); // create log-object for database
        log = yield sqliteConnection_1.database.createLog(log); // write log to database
        // Generate logging pattern
        let output = `ID: ${log.id}\t---\t\t${new Date(log.date).toLocaleDateString()} / ${new Date(log.date).toLocaleTimeString()}\t\t---\t\t Status: ${log.status}\n`
            + `\t\t\t\tDescription: ${log.eventDescription}\n`;
        if (log.repository) {
            output += `\t\t\t\tRepositoryId: ${log.repository}\n`;
        }
        if (log.backupJob) {
            output += `\t\t\t\tBackupJobId: ${log.backupJob}\n`;
        }
        if (logArgs.message) {
            logArgs.message = logArgs.message.replace(new RegExp("\n", 'g'), "\n\t\t\t\t\t\t\t");
            output += `\t\t\t\tMessage: { \t${logArgs.message}`;
        }
        output += checkError(logArgs);
        if (logArgs.message) {
            output += `\n\t\t\t\t}\n\n\n`;
        }
        // path to log folder
        let dir = path.join(path.dirname(path.dirname(__dirname)), "logs");
        if (!fsextra.existsSync(dir)) { // create "logs" folder (if not existion)
            fsextra.mkdirSync(dir);
        }
        dir = path.join(dir, logArgs.logType);
        if (!fsextra.existsSync(dir)) { // create folder for specified logType (if not existion)
            fsextra.mkdirSync(dir);
        }
        const configDir = path.join(dir, logArgs.logType + ".config");
        let config;
        if (!fsextra.existsSync(configDir)) { // create config file for managing the folder (if not existion)
            fsextra.createFileSync(configDir);
            config = { logCount: 1, lastModification: new Date() };
        }
        else {
            config = yield fsextra.readJSON(configDir);
            if (config.logCount >= globalSettings.logfileSize) { // check filesize
                const archivePath = path.join(dir, "archived");
                if (!fsextra.existsSync(archivePath)) { // create log archive folder (if not existion)
                    fsextra.mkdirSync(archivePath);
                }
                const curDate = new Date();
                const fileName = `log_${curDate.toLocaleDateString()}_${curDate.getHours()}-${curDate.getMinutes()}-${curDate.getSeconds()}.txt`;
                yield fsextra.copySync(path.join(dir, "log.txt"), path.join(archivePath, fileName)); // move logfile
                yield fsextra.removeSync(path.join(dir, "log.txt"));
                yield fsextra.createFileSync(path.join(dir, "log.txt"));
                config.logCount = 1;
                config.lastModification = new Date();
            }
            else {
                config.logCount++;
                config.lastModification = new Date();
            }
        }
        fsextra.writeJSONSync(configDir, config); // update configfile
        fsextra.appendFile(path.join(dir, "log.txt"), output); // update logfile
    });
}
exports.createLog = createLog;
function checkError(logArgs) {
    let errormessage = "";
    if ((!logArgs.eventDescription) || (!logArgs.status)) {
        errormessage += "ERROR: Missing Data for Log {";
        if (!logArgs.eventDescription) {
            errormessage += " Event Description is missing!";
        }
        if (!logArgs.status) {
            errormessage += " ERROR: Status is missing!";
        }
        errormessage += " }\n";
    }
    return errormessage;
}
exports.checkError = checkError;
function setValues(log) {
    let dbLog = new entity_1.Log();
    dbLog.status = log.status;
    dbLog.date = new Date().getTime();
    dbLog.eventDescription = log.eventDescription;
    if (log.backupJob && log.repository) {
        dbLog.backupJob = log.backupJob;
        dbLog.repository = log.repository;
    }
    return dbLog;
}
//# sourceMappingURL=functions.js.map