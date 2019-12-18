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
const express = require("express");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const checkAuth_1 = require("../../checkAuth");
exports.router = express.Router();
exports.router.get("/:userId/backupJob/:jobId/stats", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobInfo = yield sqliteConnection_1.database.getAllBackupJobLogsById(request.params.jobId);
        let oldestLog = yield sqliteConnection_1.database.getOldestLogEntryDate();
        let logs = jobInfo.success.concat(jobInfo.error).concat(jobInfo.starts);
        logs.sort((e1, e2) => e1.id - e2.id);
        const stats = {
            numberOfSuccessfulJobExecutions: 0,
            numberOfUnsuccessfulJobExecutions: 0,
            averageExecutionTime: 0,
            totalExecutionTime: 0,
            lastExecutions: [],
            oldestLogentryDate: 0
        };
        if (oldestLog) {
            stats.oldestLogentryDate = oldestLog.date;
        }
        else {
            stats.oldestLogentryDate = new Date().getTime();
        }
        let endFound = false;
        logs.forEach(startLog => {
            if (startLog.eventDescription == "api.info.backup.execute") {
                endFound = false;
                logs.forEach(stopLog => {
                    if (startLog.id < stopLog.id) {
                        if (!endFound) {
                            if (stopLog.eventDescription == "api.info.backup.execute" || stopLog.eventDescription == "api.error.backup") {
                                endFound = true;
                                stats.numberOfUnsuccessfulJobExecutions++;
                                stats.totalExecutionTime += stopLog.date - startLog.date;
                                stats.lastExecutions.unshift({
                                    date: startLog.date,
                                    duration: stopLog.date - startLog.date,
                                    success: false,
                                    jobId: startLog.backupJob,
                                    logId: startLog.id
                                });
                            }
                            if (stopLog.eventDescription == "api.success.backup") {
                                endFound = true;
                                stats.numberOfSuccessfulJobExecutions++;
                                stats.totalExecutionTime += stopLog.date - startLog.date;
                                stats.lastExecutions.unshift({
                                    date: startLog.date,
                                    duration: stopLog.date - startLog.date,
                                    success: true,
                                    jobId: startLog.backupJob,
                                    logId: startLog.id
                                });
                            }
                        }
                    }
                });
                // if(!endFound){
                //   // In this case, the job has started recently, or the job crashed
                // }
            }
        });
        stats.averageExecutionTime =
            stats.totalExecutionTime /
                (stats.numberOfSuccessfulJobExecutions +
                    stats.numberOfUnsuccessfulJobExecutions);
        ApiResponse_1.sendResponse(response, 200, {
            messages: [],
            payload: stats
        });
    });
});
//# sourceMappingURL=stats.js.map