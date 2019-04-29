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
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.delete("/:userId/backupJob/:jobId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobId = request.params.jobId;
        try {
            const job = yield sqliteConnection_1.database.deleteBackupJobById(jobId);
            if (!job) {
                throw Error("Job not found!");
            }
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.success,
                eventDescription: "api.success.backuprepository.delete",
                type: types_1.LogType.backupJob,
                jobId: job.id,
                repoId: job.repoId
            };
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: logInfo.eventDescription,
                        type: types_1.MessageType.success
                    }
                ]
            });
        }
        catch (error) {
            let errorstring = error.toString();
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.backupjob.delete.other",
                message: errorstring,
                type: types_1.LogType.backupJob,
                jobId: jobId,
                repoId: "Not existing"
            };
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: logInfo.eventDescription,
                        type: types_1.MessageType.error,
                        args: { error: errorstring }
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=delete.js.map