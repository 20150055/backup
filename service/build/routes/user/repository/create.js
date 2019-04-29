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
const restic = require("../../../scheduling");
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const enumTypes_1 = require("../../../shared/types/enumTypes");
const checkAuth_1 = require("../../checkAuth");
const functions_1 = require("./functions");
const logging_1 = require("../../../logging");
const constants_1 = require("../../../constants");
exports.router = express.Router();
exports.router.post("/:userId/repository", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errormessages = yield functions_1.checkError(body, request.params.userId, undefined);
        if (errormessages.length === 0) {
            let repo = functions_1.setValues(body, request.params.userId);
            let args;
            let message;
            if (body.repoType === enumTypes_1.RepoType.S3) {
                repo.accessKey = body.accessKey;
                repo.secretAccessKey = body.secretAccessKey;
                args = {
                    password: repo.repoPassword,
                    location: repo.repoLocation,
                    type: enumTypes_1.RepoType.S3,
                    s3AccessKey: repo.accessKey,
                    s3SecretKey: repo.secretAccessKey
                };
            }
            else {
                args = {
                    password: repo.repoPassword,
                    location: repo.repoLocation,
                    type: enumTypes_1.RepoType.Local
                };
            }
            if (constants_1.getDevelopment()) {
                message = {
                    success: true,
                    fullOutput: "Dummy create Repository while developing"
                };
            }
            else {
                message = yield restic.createRepository(args);
            }
            if (!message.success) {
                let logInfo = {
                    userId: request.params.userId,
                    logLevel: enumTypes_1.LogLevel.error,
                    eventDescription: "api.error.backuprepository.create",
                    message: message.fullOutput,
                    type: enumTypes_1.LogType.repository,
                    repoId: "Not existing"
                };
                logging_1.createLog(logInfo);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        {
                            name: logInfo.eventDescription,
                            type: types_1.MessageType.error
                        }
                    ]
                });
                return;
            }
            repo = yield sqliteConnection_1.database.createS3BackupRepository(repo);
            const responseObject = repo;
            let logInfo = {
                userId: request.params.userId,
                logLevel: enumTypes_1.LogLevel.success,
                eventDescription: "api.success.backuprepository.create",
                message: message.fullOutput,
                type: enumTypes_1.LogType.repository,
                repoId: responseObject.id
            };
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: logInfo.eventDescription,
                        type: types_1.MessageType.success
                    }
                ],
                payload: { repo: responseObject }
            });
        }
        else {
            let logInfo = {
                userId: request.params.userId,
                logLevel: enumTypes_1.LogLevel.error,
                eventDescription: "api.error.backuprepository.create",
                message: "",
                type: enumTypes_1.LogType.repository,
                repoId: request.params.repoId
            };
            errormessages.forEach(message => {
                logInfo.message += message.name + "\n";
            });
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=create.js.map