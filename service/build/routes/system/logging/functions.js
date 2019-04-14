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
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
function getParsedDBLogs(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbLogs = yield loadLogsFromDatabase(body);
        let newLogs = [];
        dbLogs.forEach(log => {
            newLogs.push(parseDBLog(log));
        });
        return newLogs;
    });
}
exports.getParsedDBLogs = getParsedDBLogs;
function parseDBLog(log) {
    let tmpLog = {
        id: log.id,
        logLevel: log.logLevel,
        date: log.date,
        eventDescription: log.eventDescription,
        type: log.logType,
        repoId: undefined,
        jobId: undefined,
        clientId: undefined
    };
    switch (log.logType) {
        case types_1.LogType.backupJob:
            tmpLog.repoId = log.repository;
            tmpLog.jobId = log.backupJob;
            break;
        case types_1.LogType.repository:
            tmpLog.repoId = log.repository;
            break;
        case types_1.LogType.client:
            tmpLog.clientId = log.client;
            break;
    }
    const newLog = tmpLog;
    return newLog;
}
function loadLogsFromDatabase(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (body.type) {
            switch (body.type) {
                case types_1.LogType.other:
                    return yield sqliteConnection_1.database.getFilteredLogsOther();
                case types_1.LogType.client:
                    return yield sqliteConnection_1.database.getFilteredLogsClient(body.clientId);
                case types_1.LogType.repository:
                    return yield sqliteConnection_1.database.getFilteredLogsRepository(body.repoId);
                case types_1.LogType.backupJob:
                    return yield sqliteConnection_1.database.getFilteredLogsBackupJob(body.jobId);
            }
        }
        else {
            return yield sqliteConnection_1.database.getLogs();
        }
    });
}
function filterOffsetLimit(body, logs) {
    // Filter by offset & limit
    let start;
    let stop;
    if (body.offset != undefined && body.offset < logs.length - 1) {
        start = body.offset;
    }
    else {
        start = logs.length - 1;
    }
    if (body.limit > start) {
        stop = 0;
    }
    else {
        stop = start + 1 - body.limit;
    }
    let filteredLogs = [];
    var i;
    for (i = start; i >= stop; i--) {
        filteredLogs.push(logs[i]);
    }
    return filteredLogs;
}
exports.filterOffsetLimit = filterOffsetLimit;
//# sourceMappingURL=functions.js.map