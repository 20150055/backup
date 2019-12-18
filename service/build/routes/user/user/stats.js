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
exports.router.get("/:userId/stats", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(request.params.repoId);
        const jobInfo = yield sqliteConnection_1.database.getAllBackupJobLogs();
        let logs = jobInfo.success.concat(jobInfo.error).concat(jobInfo.starts);
        logs.sort((e1, e2) => e1.id - e2.id);
        const stats = {
            numberOfSuccessfulRestoresThisMonth: 0,
            jobExecutionCount: {},
            lastExecutions: []
        };
        let endFound = false;
        logs.forEach(startLog => {
            if (startLog.eventDescription == "api.info.backup.execute") {
                endFound = false;
                logs.forEach(stopLog => {
                    if (startLog.backupJob == stopLog.backupJob && startLog.id < stopLog.id) {
                        if (!endFound) {
                            if (stopLog.eventDescription == "api.info.backup.execute" || stopLog.eventDescription == "api.error.backup" || stopLog.eventDescription == "api.success.backup") {
                                endFound = true;
                                let success = false;
                                if (stopLog.eventDescription == "api.success.backup") {
                                    success = true;
                                }
                                let date = new Date(startLog.date);
                                switch (date.getMonth()) {
                                    case 0:
                                        if (!stats.jobExecutionCount.january) {
                                            stats.jobExecutionCount.january = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.january.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.january.failedExecutions++;
                                        }
                                        break;
                                    case 1:
                                        if (!stats.jobExecutionCount.february) {
                                            stats.jobExecutionCount.february = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.february.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.february.failedExecutions++;
                                        }
                                        break;
                                    case 2:
                                        if (!stats.jobExecutionCount.march) {
                                            stats.jobExecutionCount.march = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.march.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.march.failedExecutions++;
                                        }
                                        break;
                                    case 3:
                                        if (!stats.jobExecutionCount.april) {
                                            stats.jobExecutionCount.april = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.april.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.april.failedExecutions++;
                                        }
                                        break;
                                    case 4:
                                        if (!stats.jobExecutionCount.may) {
                                            stats.jobExecutionCount.may = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.may.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.may.failedExecutions++;
                                        }
                                        break;
                                    case 5:
                                        if (!stats.jobExecutionCount.june) {
                                            stats.jobExecutionCount.june = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.june.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.june.failedExecutions++;
                                        }
                                        break;
                                    case 6:
                                        if (!stats.jobExecutionCount.july) {
                                            stats.jobExecutionCount.july = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.july.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.july.failedExecutions++;
                                        }
                                        break;
                                    case 7:
                                        if (!stats.jobExecutionCount.august) {
                                            stats.jobExecutionCount.august = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.august.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.august.failedExecutions++;
                                        }
                                        break;
                                    case 8:
                                        if (!stats.jobExecutionCount.september) {
                                            stats.jobExecutionCount.september = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.september.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.september.failedExecutions++;
                                        }
                                        break;
                                    case 9:
                                        if (!stats.jobExecutionCount.october) {
                                            stats.jobExecutionCount.october = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.october.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.october.failedExecutions++;
                                        }
                                        break;
                                    case 10:
                                        if (!stats.jobExecutionCount.november) {
                                            stats.jobExecutionCount.november = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.november.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.november.failedExecutions++;
                                        }
                                        break;
                                    case 11:
                                        if (!stats.jobExecutionCount.december) {
                                            stats.jobExecutionCount.december = {
                                                failedExecutions: 0,
                                                successfulExecutions: 0
                                            };
                                        }
                                        if (success) {
                                            stats.jobExecutionCount.december.successfulExecutions++;
                                        }
                                        else {
                                            stats.jobExecutionCount.december.failedExecutions++;
                                        }
                                        break;
                                }
                                stats.lastExecutions.unshift({
                                    date: startLog.date,
                                    duration: stopLog.date - startLog.date,
                                    success: success,
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
        stats.numberOfSuccessfulRestoresThisMonth = (yield sqliteConnection_1.database.getAllSuccessfullRestores()).length;
        ApiResponse_1.sendResponse(response, 200, {
            messages: [],
            payload: stats
        });
    });
});
//# sourceMappingURL=stats.js.map