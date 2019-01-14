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
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(request.body.username && request.body.password)) {
                errorOccured = true;
                if (!request.body.username) {
                    errormessages.push({ name: "api.error.user.login.missing-data.username", type: types_1.MessageType.error });
                }
                if (!request.body.password) {
                    errormessages.push({ name: "api.error.user.login.missing-data.password", type: types_1.MessageType.error });
                }
            }
            else {
                const user = yield sqliteConnection_1.database.loadUserByUsername(request.body.username);
                if (!user) {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.user.login.user-not-found", type: types_1.MessageType.error, args: { "username": request.body.username } });
                }
                else {
                    if (user.password != sqliteConnection_1.database.hash(request.body.password)) {
                        errorOccured = true;
                        errormessages.push({ name: "api.error.user.login.wrong-password", type: types_1.MessageType.error });
                    }
                }
            }
            if (!errorOccured) {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.user.login", type: types_1.MessageType.success }], payload: { "token": uuidv4() } });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({ name: "api.error.user.login.other", type: types_1.MessageType.error, args: { "error": errorstring } });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let eerrorOccured = false;
        let errormessages = [];
        try {
            if (!(request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password)) {
                eerrorOccured = true;
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
            }
            if (request.body.username) {
                if (yield sqliteConnection_1.database.loadUserByUsername(request.body.username)) {
                    eerrorOccured = true;
                    errormessages.push({ name: "api.error.user.register.username-already-exists", type: types_1.MessageType.error, args: { "username": request.body.username } });
                }
            }
            let email = request.body.email;
            if (request.body.email) {
                email = email.toLowerCase();
                if (yield sqliteConnection_1.database.loadUserByEmail(request.body.email)) {
                    eerrorOccured = true;
                    errormessages.push({ name: "api.error.user.register.email-already-exists", type: types_1.MessageType.error, args: { "email": request.body.email } });
                }
            }
            if (!eerrorOccured) {
                sqliteConnection_1.database.createUser(request.body.firstName, request.body.lastName, request.body.username, email, request.body.password);
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.user.register", type: types_1.MessageType.success }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({ name: "api.error.user.register.other", type: types_1.MessageType.error, args: { "error": errorstring } });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.get("/anyExists", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield sqliteConnection_1.database.countUsers();
            if (count > 0) {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.true", type: types_1.MessageType.info }], payload: { "value": true } });
            }
            else {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.false", type: types_1.MessageType.info }], payload: { "value": false } });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.anyExists.unknown", type: types_1.MessageType.error, args: { "error": errorstring } }] });
        }
    });
});
router.post("/BackupJob", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(request.body.repoId && request.body.name && request.body.maxBackups && request.body.emailNotification)) {
                errorOccured = true;
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
            }
            let email = request.body.emailNotification;
            if (request.body.emailNotification) {
                email = email.toUpperCase();
                if (email != "ALWAYS" && email != "ONLY IN CASE OF AN ERROR" && email != "NEVER") {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.backupjob.create.invalid-emailnotification", type: types_1.MessageType.error, args: { "emailNotification": email } });
                }
            }
            if (request.body.name) {
                if (yield sqliteConnection_1.database.loadBackupJobByName(request.body.name)) {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.backupjob.create.job-already-existing", type: types_1.MessageType.error });
                }
            }
            if (request.body.repoId) {
                if (!(yield sqliteConnection_1.database.loadBackupRepository(request.body.repoId))) {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.backupjob.create.repository-not-found", type: types_1.MessageType.error, args: { "repoID": request.body.repoId } });
                }
            }
            if (!errorOccured) {
                sqliteConnection_1.database.createBackupjob(request.body.repoId, request.body.name, request.body.maxBackups, email, request.body.backupLocations);
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.backupjob.create", type: types_1.MessageType.success, args: { "name": request.body.name, "repoid": request.body.repoId } }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({ name: "api.error.backupjob.create.other", type: types_1.MessageType.error, args: { "error": errorstring } });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/BackupRepository", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(request.body.repoType && request.body.repoName && request.body.repoPassword && request.body.autoUnlock && request.body.repoLocation)) {
                errorOccured = true;
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
            }
            if (request.body.repoName) {
                if (yield sqliteConnection_1.database.loadBackupRepository(request.body.repoName)) {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.backuprepository.create.repo-already-existing", type: types_1.MessageType.error });
                }
            }
            let repoType = request.body.repoType;
            if (request.body.repoType) {
                repoType = repoType.toUpperCase();
                if (repoType === "AMAZON S3") {
                    if (!(request.body.accessKey && request.body.secretAccessKey)) {
                        errorOccured = true;
                        if (!request.body.accessKey) {
                            errormessages.push({ name: "api.error.backuprepository.create.missing-data.accessKey", type: types_1.MessageType.error });
                        }
                        if (!request.body.secretAccessKey) {
                            errormessages.push({ name: "api.error.backuprepository.create.missing-data.secretAccessKey", type: types_1.MessageType.error });
                        }
                    }
                }
                else if (repoType != "LOCAL") {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.backuprepository.create.unknown-repo-type", type: types_1.MessageType.error, args: { "repoType": repoType } });
                }
            }
            if (!errorOccured) {
                if (repoType === "AMAZON S3") {
                    sqliteConnection_1.database.createAmazonS3BackupRepository(repoType, request.body.repoName, request.body.repoPassword, request.body.autoUnlock, request.body.repoLocation, request.body.accessKey, request.body.secretAccessKey);
                }
                if (repoType === "LOCAL") {
                    sqliteConnection_1.database.createLocalBackupRepository(repoType, request.body.repoName, request.body.repoPassword, request.body.autoUnlock, request.body.repoLocation);
                }
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.backuprepository.create", type: types_1.MessageType.success, args: { "name": request.body.repoName, "type": repoType } }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({ name: "api.error.backuprepository.create.other", type: types_1.MessageType.error, args: { "error": errorstring } });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/usersettings", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(request.body.userId && request.body.enableRegister && request.body.automaticUpdates && request.body.sendEmails && request.body.reportLanguage && request.body.language &&
                request.body.showSnackbar && request.body.themePrimary && request.body.themeSecondary && request.body.themeAccent && request.body.darktheme)) {
                errorOccured = true;
                if (!request.body.userId) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.userId", type: types_1.MessageType.error });
                }
                if (!request.body.enableRegister) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.enableRegister", type: types_1.MessageType.error });
                }
                if (!request.body.automaticUpdates) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.automaticUpdates", type: types_1.MessageType.error });
                }
                if (!request.body.sendEmails) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.sendEmails", type: types_1.MessageType.error });
                }
                if (!request.body.reportLanguage) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.reportLanguage", type: types_1.MessageType.error });
                }
                if (!request.body.language) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.language", type: types_1.MessageType.error });
                }
                if (!request.body.showSnackbar) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.showSnackbar", type: types_1.MessageType.error });
                }
                if (!request.body.themePrimary) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.themePrimary", type: types_1.MessageType.error });
                }
                if (!request.body.themeSecondary) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.themeSecondary", type: types_1.MessageType.error });
                }
                if (!request.body.themeAccent) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.themeAccent", type: types_1.MessageType.error });
                }
                if (!request.body.darktheme) {
                    errormessages.push({ name: "api.error.usersettings.create.missing-data.darktheme", type: types_1.MessageType.error });
                }
            }
            if (request.body.userId) {
                if (yield sqliteConnection_1.database.loadUserSettingsByUserId(request.body.userId)) {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.usersettings.create.settings-already-existing", type: types_1.MessageType.error });
                }
                if (!(yield sqliteConnection_1.database.loadUserById(request.body.userId))) {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.usersettings.create.user-not-found", type: types_1.MessageType.error });
                }
            }
            let interval = request.body.updateCheckInterval;
            if (request.body.updateCheckInterval) {
                interval = interval.toUpperCase();
                if (interval != "HOURLY" && interval != "DAILY" && interval != "WEEKLY") {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.usersettings.create.invalid-updateCheckInterval", type: types_1.MessageType.error });
                }
            }
            let language = request.body.language;
            if (request.body.language) {
                language = language.toLowerCase();
                if (language != "de" && language != "en") {
                    errorOccured = true;
                    errormessages.push({ name: "api.error.usersettings.create.invalid-language", type: types_1.MessageType.error });
                }
            }
            if (!errorOccured) {
                sqliteConnection_1.database.createUserSetting(request.body.userId, request.body.enableRegister, request.body.automaticUpdates, interval, request.body.sendEmails, request.body.reportLanguage, request.body.smtpHostname, request.body.smtpPort, request.body.smtpUsername, request.body.smtpPassword, request.body.smtpFrom, request.body.smtpTo, language, request.body.showSnackbar, request.body.themePrimary, request.body.themeSecondary, request.body.themeAccent, request.body.darktheme);
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.usersettings.create", type: types_1.MessageType.success }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({ name: "api.error.usersettings.create.other", type: types_1.MessageType.error, args: { "error": errorstring } });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
exports.default = router;
//# sourceMappingURL=apiUser.js.map