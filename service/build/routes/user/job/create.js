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
const enumTypes_1 = require("../../../shared/types/enumTypes");
const checkAuth_1 = require("../../checkAuth");
const BackupJob_1 = require("../../../entity/BackupJob");
exports.router = express.Router();
exports.router.post("/:userId/backupJob", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(body.repoId &&
                body.name &&
                body.maxBackups &&
                body.emailNotification &&
                body.backupLocations)) {
                errorOccured = true;
                if (!body.repoId) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.repoId",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.name) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.name",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.maxBackups) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.maxBackups",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.emailNotification) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.emailNotification",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.backupLocations) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.backupLocations",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.name) {
                if (yield sqliteConnection_1.database.loadBackupJobByName(body.name)) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backupjob.create.job-already-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.repoId) {
                if (!(yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(body.repoId))) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backupjob.create.repository-not-existing",
                        type: types_1.MessageType.error,
                        args: { repoId: body.repoId.toString() }
                    });
                }
            }
            if (body.emailNotification) {
                if (body.emailNotification != enumTypes_1.EmailNotification.always &&
                    body.emailNotification != enumTypes_1.EmailNotification.never &&
                    body.emailNotification != enumTypes_1.EmailNotification.onerror) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backupjob.create.invalid-emailNotification",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (request.params.userId) {
                if (!(yield sqliteConnection_1.database.loadUserById(request.params.userId))) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backupjob.create.user-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            else {
                errorOccured = true;
                errormessages.push({
                    name: "api.error.backupjob.create.no-user-specified",
                    type: types_1.MessageType.error
                });
            }
            if (!errorOccured) {
                let job = new BackupJob_1.BackupJob;
                ;
                job.user = request.params.userId;
                job.repo = body.repoId;
                job.name = body.name;
                job.maxBackups = body.maxBackups;
                job.emailNotification = body.emailNotification;
                job.backupLocations = body.backupLocations;
                yield sqliteConnection_1.database.createBackupjob(job);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        {
                            name: "api.success.backupjob.create",
                            type: types_1.MessageType.success
                        }
                    ],
                    payload: { job: job }
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.backupjob.create.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=create.js.map