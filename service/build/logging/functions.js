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
const types_1 = require("../shared/types");
const sqliteConnection_1 = require("../sqliteConnection");
const fsextra = require("fs-extra");
const path = require("path");
const entity_1 = require("../entity");
function createLog(logArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = yield checkError(logArgs);
        let log;
        if (errormessages.length === 0) {
            log = setValues(logArgs); // create log-object for database
        }
        else {
            log = new entity_1.Log();
            log.logType = types_1.LogType.other;
            log.logLevel = types_1.LogLevel.error;
            log.date = new Date().getTime();
            log.eventDescription = "api.error.system.log";
            logArgs.message = "";
            errormessages.forEach(message => {
                logArgs.message += "\n" + message.name;
            });
            logArgs.logType = types_1.LogType.other;
        }
        log = yield sqliteConnection_1.database.createLog(log); // write log to database
        const globalSettings = yield sqliteConnection_1.database.loadGlobalSettingsById(1);
        // Generate logging pattern
        let output = `ID: ${log.id}\t---\t\t${new Date(log.date).toLocaleDateString()} / ${new Date(log.date).toLocaleTimeString()}\t\t---\t\t Status: ${log.logLevel}\n` +
            `\t\t\t\tDescription: ${log.eventDescription}\n`;
        if (log.repository) {
            output += `\t\t\t\tRepositoryId: ${log.repository}\n`;
        }
        if (log.backupJob) {
            output += `\t\t\t\tBackupJobId: ${log.backupJob}\n`;
        }
        if (logArgs.message) {
            logArgs.message = logArgs.message.replace(new RegExp("\n", "g"), "\n\t\t\t\t\t\t\t");
            output += `\t\t\t\tMessage: { \t${logArgs.message}`;
        }
        if (logArgs.message) {
            output += `\n\t\t\t\t}\n\n\n`;
        }
        // path to log folder
        let dir = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "logs");
        if (!fsextra.existsSync(dir)) {
            // create "logs" folder (if not existion)
            fsextra.mkdirSync(dir);
        }
        dir = path.join(dir, logArgs.logType);
        if (!fsextra.existsSync(dir)) {
            // create folder for specified logType (if not existion)
            fsextra.mkdirSync(dir);
        }
        const configDir = path.join(dir, logArgs.logType + ".config");
        let config;
        if (!fsextra.existsSync(configDir)) {
            // create config file for managing the folder (if not existion)
            fsextra.createFileSync(configDir);
            config = { logCount: 1, lastModification: new Date() };
        }
        else {
            config = yield fsextra.readJSON(configDir);
            if (config.logCount >= globalSettings.logfileSize) {
                // check filesize
                const archivePath = path.join(dir, "archived");
                if (!fsextra.existsSync(archivePath)) {
                    // create log archive folder (if not existion)
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
        if (errormessages.length === 0) {
            return true;
        }
        return errormessages;
    });
}
exports.createLog = createLog;
function checkError(logArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        if (!logArgs.eventDescription || !logArgs.status) {
            if (!logArgs.eventDescription) {
                errormessages.push({
                    name: "api.error.system.log.missing-arguments-eventDescription",
                    type: types_1.MessageType.error
                });
            }
            if (!logArgs.status) {
                errormessages.push({
                    name: "api.error.system.log.missing-arguments-status",
                    type: types_1.MessageType.error
                });
            }
        }
        if (!(logArgs.logType === types_1.LogType.other ||
            logArgs.logType === types_1.LogType.client ||
            logArgs.logType === types_1.LogType.repository ||
            logArgs.logType === types_1.LogType.backupJob)) {
            errormessages.push({
                name: "api.error.system.log.invalid-logtype",
                type: types_1.MessageType.error
            });
        }
        if (logArgs.repository) {
            if (!(yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(logArgs.repository))) {
                errormessages.push({
                    name: "api.error.system.log.repository-not-existing",
                    type: types_1.MessageType.error
                });
            }
        }
        if (logArgs.backupJob) {
            if (!(yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(logArgs.backupJob))) {
                errormessages.push({
                    name: "api.error.system.log.backupJob-not-existing",
                    type: types_1.MessageType.error
                });
            }
        }
        return errormessages;
    });
}
function setValues(log) {
    let dbLog = new entity_1.Log();
    dbLog.logType = log.logType;
    dbLog.logLevel = log.status;
    dbLog.date = new Date().getTime();
    dbLog.eventDescription = log.eventDescription;
    if (log.backupJob) {
        dbLog.backupJob = log.backupJob;
    }
    if (log.repository) {
        dbLog.repository = log.repository;
    }
    return dbLog;
}
function findLogFile(date) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
    });
}
exports.findLogFile = findLogFile;
//# sourceMappingURL=functions.js.map