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
const scheduling_1 = require("../../../scheduling");
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.post("/:userId/repository/:repoId/rebuild", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(request.params.repoId);
        let logInfo;
        if (repo) {
            let resticOutput;
            if (repo.repoType === types_1.RepoType.Local) {
                resticOutput = yield scheduling_1.rebuildRepoIndex({
                    location: repo.repoLocation,
                    password: repo.repoPassword,
                    type: repo.repoType
                });
            }
            else {
                resticOutput = yield scheduling_1.rebuildRepoIndex({
                    location: repo.repoLocation,
                    password: repo.repoPassword,
                    type: repo.repoType,
                    s3AccessKey: repo.accessKey,
                    s3SecretKey: repo.secretAccessKey
                });
            }
            if (resticOutput.success) {
                logInfo = {
                    userId: request.params.userId,
                    logLevel: types_1.LogLevel.success,
                    eventDescription: "api.success.backuprepository.rebuild",
                    message: "Rebuild successfull",
                    type: types_1.LogType.repository,
                    repoId: request.params.repoId
                };
            }
            else {
                logInfo = {
                    userId: request.params.userId,
                    logLevel: types_1.LogLevel.error,
                    eventDescription: "api.error.backuprepository.rebuild",
                    message: "Rebuild failed",
                    type: types_1.LogType.repository,
                    repoId: request.params.repoId
                };
            }
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, (logInfo.logLevel == types_1.LogLevel.success ? 200 : 400), {
                messages: [
                    { name: logInfo.eventDescription,
                        type: (logInfo.logLevel == types_1.LogLevel.success ? types_1.MessageType.success : types_1.MessageType.error),
                        args: { "message": (logInfo.message ? logInfo.message : "") }
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=rebuild.js.map