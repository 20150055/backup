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
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const checkAuth_1 = require("../../checkAuth");
const functions_1 = require("./functions");
const logging_1 = require("../../../logging");
const backupScheduling_1 = require("../../../scheduling/backupScheduling");
exports.router = express.Router();
exports.router.put("/:userId/backupJob/:jobId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const jobId = request.params.jobId;
        let errormessages = yield functions_1.checkError(body, request.params.userId, jobId);
        if (errormessages.length === 0) {
            const oldJob = yield sqliteConnection_1.database.loadBackupJobById(jobId);
            if (!oldJob) {
                ApiResponse_1.sendResponse(response, 400, {
                    messages: [
                        {
                            name: "api.error.backupjob.update.job-not-existing",
                            type: types_1.MessageType.error
                        }
                    ]
                });
                return;
            }
            let newJob = functions_1.setValues(body, request.params.userId);
            newJob.id = oldJob.id;
            newJob.user = oldJob.user;
            newJob.repoId = oldJob.repoId;
            newJob.log = oldJob.log;
            newJob = yield sqliteConnection_1.database.createBackupjob(newJob);
            const responseObject = newJob;
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.success,
                eventDescription: "api.success.backupjob.update",
                type: types_1.LogType.backupJob,
                jobId: responseObject.id,
                repoId: responseObject.repoId
            };
            logging_1.createLog(logInfo);
            if (!oldJob.active && !newJob.active) {
                backupScheduling_1.scheduleBackup(newJob.id);
            }
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: logInfo.eventDescription,
                        type: types_1.MessageType.success
                    }
                ],
                payload: { job: responseObject }
            });
        }
        else {
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.backupjob.update",
                message: "",
                type: types_1.LogType.backupJob,
                jobId: request.params.jobId,
                repoId: body.repoId
            };
            errormessages.forEach(message => {
                logInfo.message += message.name + "\n";
            });
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=update.js.map