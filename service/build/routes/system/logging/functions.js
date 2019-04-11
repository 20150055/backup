"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../shared/types");
function parseDBLogs(logs, type) {
    let newLogs = [];
    logs.forEach(log => {
        if (type) {
            if (log.logType === type) {
                newLogs.push(parseDBLog(log));
            }
        }
        else {
            newLogs.push(parseDBLog(log));
        }
    });
    return newLogs;
}
exports.parseDBLogs = parseDBLogs;
function parseDBLog(log) {
    let newLog;
    newLog.id = log.id;
    newLog.logLevel = log.logLevel;
    newLog.date = log.date;
    newLog.eventDescription = log.eventDescription;
    newLog.type = log.logType;
    switch (newLog.type) {
        case types_1.LogType.backupJob:
            newLog.repoId = log.repository;
            newLog.jobId = log.backupJob;
            break;
        case types_1.LogType.repository:
            newLog.repoId = log.repository;
            break;
        case types_1.LogType.client:
            newLog.clientId = log.client;
            break;
    }
    return newLog;
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