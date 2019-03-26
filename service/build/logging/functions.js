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
function createLog(logArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const globalSettings = yield sqliteConnection_1.database.loadGlobalSettingsById(0);
        const id = yield sqliteConnection_1.database.getNextLogId();
        let newLog = { id: id, date: new Date().getTime(), status: logArgs.status, eventDescription: logArgs.eventDescription,
            backupJob: logArgs.backupJobId, repository: logArgs.repositoryId };
        // Generate logging pattern
        let output = `ID: ${newLog.id}\t---\t\t${new Date(newLog.date).toLocaleDateString()} / ${new Date(newLog.date).toLocaleTimeString()}\t\t---\t\t Status: ${newLog.status}\n`
            + `\t\t\t\tDescription: ${newLog.eventDescription}\n`;
        if (newLog.repository) {
            output += `\t\t\t\tRepositoryId: ${newLog.repository}\n`;
        }
        if (newLog.backupJob) {
            output += `\t\t\t\tBackupJobId: ${newLog.backupJob}\n`;
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
        if (!fsextra.existsSync(dir)) {
            fsextra.mkdirSync(dir);
        }
        dir = path.join(dir, logArgs.logType);
        if (!fsextra.existsSync(dir)) {
            fsextra.mkdirSync(dir);
        }
        const configDir = path.join(dir, logArgs.logType + ".config");
        if (!fsextra.existsSync(configDir)) {
            fsextra.createFileSync(configDir);
            fsextra.writeJSONSync(configDir, { count: "0" });
        }
        else {
            const counter = Number.parseInt((yield fsextra.readJSON(configDir)).count);
            fsextra.writeJSONSync(configDir, { count: (counter + 1).toString() });
        }
        // TODO
        dir = path.join(dir, "log.txt");
        fsextra.appendFile(dir, output);
        // await database.createLog(newLog as Log); TODO: fix bug
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
//# sourceMappingURL=functions.js.map