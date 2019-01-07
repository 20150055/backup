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
const uuidv4 = require("uuid/v4");
const types_1 = require("./shared/types");
const sqliteConnection_1 = require("./sqliteConnection");
const ApiResponse_1 = require("./ApiResponse");
const router = express.Router();
router.post("/login", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.username && request.body.password) {
            try {
                const user = yield sqliteConnection_1.database.loadUserByUsername(request.body.username);
                if (user.password === sqliteConnection_1.database.hash(request.body.password)) {
                    ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.user.login", type: types_1.MessageType.success }], payload: { token: uuidv4() } });
                }
                else {
                    ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.login.missing-username", type: types_1.MessageType.error }] });
                }
            }
            catch (error) {
                ApiResponse_1.sendResponse(response, 404, { messages: [{ name: "api.error.user.login.user-not-found", type: types_1.MessageType.error, args: { "username": request.body.username } }] });
            }
        }
        else {
            let errormessages = [];
            if (!request.body.username) {
                errormessages.push({ name: "api.error.user.login.missing-data.username", type: types_1.MessageType.error });
            }
            if (!request.body.password) {
                errormessages.push({ name: "api.error.user.login.missing-data.password", type: types_1.MessageType.error });
            }
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password) {
            try {
                if (yield sqliteConnection_1.database.loadUserByUsername(request.body.username)) {
                    ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.register.username-already-exists", type: types_1.MessageType.error, args: { "username": request.body.username } }] });
                }
                else {
                    sqliteConnection_1.database.createUser(request.body.firstName, request.body.lastName, request.body.username, request.body.email, request.body.password);
                    ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.user.register", type: types_1.MessageType.success }] });
                }
            }
            catch (error) {
                let errorstring = error.toString();
                ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.register.other", type: types_1.MessageType.error, args: { "error": errorstring } }] });
            }
        }
        else {
            let errormessages = [];
            if (!request.body.firstName) {
                errormessages.push({ name: "api.error.user.register.missing-data.firstName", type: types_1.MessageType.error });
            }
            if (!request.body.lastName) {
                errormessages.push({ name: "api.error.user.register.missing-data.lastName", type: types_1.MessageType.error });
            }
            if (!request.body.username) {
                errormessages.push({ name: "api.error.user.register.missing-data.username", type: types_1.MessageType.error });
            }
            if (!request.body.email) {
                errormessages.push({ name: "api.error.user.register.missing-data.email", type: types_1.MessageType.error });
            }
            if (!request.body.password) {
                errormessages.push({ name: "api.error.user.register.missing-data.password", type: types_1.MessageType.error });
            }
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/createBackupJob", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.repoId && request.body.name && request.body.maxBackups && request.body.emailNotification && request.body.backupLocations) {
            try {
                let email = request.body.emailNotification;
                email = email.toUpperCase();
                if (email === "ALWAYS" || email === "ONLY IN CASE OF AN ERROR" || email === "NEVER") {
                    if (!(yield sqliteConnection_1.database.loadBackupJobByRepoID(request.body.repoId))) {
                        if (yield sqliteConnection_1.database.backupRepositoryExists(request.body.repoId)) {
                            sqliteConnection_1.database.createBackupjob(request.body.repoId, request.body.name, request.body.maxBackups, request.body.emailNotification, request.body.backupLocations);
                            ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.backupjob.create", type: types_1.MessageType.success, args: { "repoid": request.body.repoId, "name": request.body.name } }] });
                        }
                        else {
                            ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backupjob.create.repository-not-found", type: types_1.MessageType.error, args: { "repoID": request.body.repoId } }] });
                        }
                    }
                    else {
                        ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backupjob.create.job-already-existing", type: types_1.MessageType.error },
                                { name: "api.info.backupjob.name.not-case-sensitive", type: types_1.MessageType.info }] });
                    }
                }
                else {
                    ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backupjob.create.invalid-emailnotification", type: types_1.MessageType.error, args: { "emailNotification": email } }] });
                }
            }
            catch (error) {
                let errorstring = error.toString();
                ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backupjob.create.other", type: types_1.MessageType.error, args: { "error": errorstring } }] });
            }
        }
        else {
            let errormessages = [];
            if (!request.body.repoId) {
                errormessages.push({ name: "api.error.backupjob.create.missing-data.repoId", type: types_1.MessageType.error });
            }
            if (!request.body.name) {
                errormessages.push({ name: "api.error.backupjob.create.missing-data.name", type: types_1.MessageType.error });
            }
            if (!request.body.maxBackups) {
                errormessages.push({ name: "api.error.backupjob.create.missing-data.maxBackups", type: types_1.MessageType.error });
            }
            if (!request.body.emailNotification) {
                errormessages.push({ name: "api.error.backupjob.create.missing-data.emailNotification", type: types_1.MessageType.error });
            }
            if (!request.body.backupLocations) {
                errormessages.push({ name: "api.error.backupjob.create.missing-data.backupLocations", type: types_1.MessageType.error });
            }
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/createBackupRepository", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.repoType && request.body.repoName && request.body.repoPassword && request.body.autoUnlock && request.body.repoLocation) {
            try {
                if (!(yield sqliteConnection_1.database.backupRepositoryExists(request.body.repoName))) {
                    let repoType = request.body.repoType;
                    repoType = repoType.toUpperCase();
                    if (repoType === "AMAZON S3") {
                        if (request.body.accessKey && request.body.secretAccessKey) {
                            sqliteConnection_1.database.create_Amazon_S3_BackupRepository(repoType, request.body.repoName, request.body.repoPassword, request.body.autoUnlock, request.body.repoLocation, request.body.accessKey, request.body.secretAccessKey);
                            ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.backuprepository.create", type: types_1.MessageType.success, args: { "name": request.body.repoName, "type": repoType } }] });
                        }
                        else {
                            let errormessages = [];
                            if (!request.body.accessKey) {
                                errormessages.push({ name: "api.error.backuprepository.create.missing-data.accessKey", type: types_1.MessageType.error });
                            }
                            if (!request.body.secretAccessKey) {
                                errormessages.push({ name: "api.error.backuprepository.create.missing-data.secretAccessKey", type: types_1.MessageType.error });
                            }
                            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
                        }
                    }
                    else if (repoType === "LOCAL" || repoType === "SMTP") {
                        sqliteConnection_1.database.create_Local_SFTP_BackupRepository(repoType, request.body.repoName, request.body.repoPassword, request.body.autoUnlock, request.body.repoLocation);
                        ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.backuprepository.create", type: types_1.MessageType.success, args: { "name": request.body.repoName, "type": repoType } }] });
                    }
                    else {
                        ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backuprepository.create.unknown-repo-type", type: types_1.MessageType.error, args: { "repoType": repoType } }] });
                    }
                }
                else {
                    ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backuprepository.create.repo-already-existing", type: types_1.MessageType.error },
                            { name: "api.info.backuprepository.name.not-case-sensitive", type: types_1.MessageType.info }] });
                }
            }
            catch (error) {
                let errorstring = error.toString();
                ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.backuprepository.create.other", type: types_1.MessageType.error, args: { "error": errorstring } }] });
            }
        }
        else {
            let errormessages = [];
            if (!request.body.repoType) {
                errormessages.push({ name: "api.error.backuprepository.create.missing-data.repoType", type: types_1.MessageType.error });
            }
            if (!request.body.repoName) {
                errormessages.push({ name: "api.error.backuprepository.create.missing-data.repoName", type: types_1.MessageType.error });
            }
            if (!request.body.repoPassword) {
                errormessages.push({ name: "api.error.backuprepository.create.missing-data.repoPassword", type: types_1.MessageType.error });
            }
            if (!request.body.autoUnlock) {
                errormessages.push({ name: "api.error.backuprepository.create.missing-data.autoUnlock", type: types_1.MessageType.error });
            }
            if (!request.body.repoLocation) {
                errormessages.push({ name: "api.error.backuprepository.create.missing-data.repoLocation", type: types_1.MessageType.error });
            }
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.get("/anyExists", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield sqliteConnection_1.database.countUsers();
            if (count > 0) {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.true", type: types_1.MessageType.info }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.false", type: types_1.MessageType.info }] });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.anyExists.unknown", type: types_1.MessageType.error, args: { "error": errorstring } }] });
        }
    });
});
exports.default = router;
//# sourceMappingURL=apiUser.js.map