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
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(body.username && body.password)) {
                errorOccured = true;
                if (!body.username) {
                    errormessages.push({
                        name: "api.error.user.login.missing-data.username",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.password) {
                    errormessages.push({
                        name: "api.error.user.login.missing-data.password",
                        type: types_1.MessageType.error
                    });
                }
            }
            else {
                const user = yield sqliteConnection_1.database.loadUserByUsername(body.username);
                if (!user) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.user.login.user-not-found",
                        type: types_1.MessageType.error,
                        args: { username: body.username }
                    });
                }
                else {
                    if (user.password != sqliteConnection_1.database.hash(body.password)) {
                        errorOccured = true;
                        errormessages.push({
                            name: "api.error.user.login.wrong-password",
                            type: types_1.MessageType.error
                        });
                    }
                }
            }
            if (!errorOccured) {
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.success.user.login", type: types_1.MessageType.success }
                    ],
                    payload: { token: uuidv4() }
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.user.login.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let eerrorOccured = false;
        let errormessages = [];
        try {
            if (!(body.firstName &&
                body.lastName &&
                body.username &&
                body.email &&
                body.password)) {
                eerrorOccured = true;
                if (!body.firstName) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.firstName",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.lastName) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.lastName",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.username) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.username",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.email) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.email",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.password) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.password",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.username) {
                if (yield sqliteConnection_1.database.loadUserByUsername(body.username)) {
                    eerrorOccured = true;
                    errormessages.push({
                        name: "api.error.user.register.username-already-exists",
                        type: types_1.MessageType.error,
                        args: { username: body.username }
                    });
                }
            }
            if (body.email) {
                body.email = body.email.toLowerCase();
                if (yield sqliteConnection_1.database.loadUserByEmail(body.email)) {
                    eerrorOccured = true;
                    errormessages.push({
                        name: "api.error.user.register.email-already-exists",
                        type: types_1.MessageType.error,
                        args: { email: body.email }
                    });
                }
            }
            if (!eerrorOccured) {
                sqliteConnection_1.database.createUser(body.firstName, body.lastName, body.username, body.email, body.password);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.success.user.register", type: types_1.MessageType.success }
                    ]
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.user.register.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.get("/anyExists", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield sqliteConnection_1.database.countUsers();
            if (count > 0) {
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.info.user.anyExists.true", type: types_1.MessageType.info }
                    ],
                    payload: { value: true }
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.info.user.anyExists.false", type: types_1.MessageType.info }
                    ],
                    payload: { value: false }
                });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.user.anyExists.unknown",
                        type: types_1.MessageType.error,
                        args: { error: errorstring }
                    }
                ]
            });
        }
    });
});
// router.use("/:userId/repository", repositoryRouter)
// router.use("/:userId/job", backupJobRouter)
router.post("/backupJob", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //request.params.userId
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
            if (body.emailNotification) {
                body.emailNotification = body.emailNotification.toUpperCase();
                if (body.emailNotification != "ALWAYS" &&
                    body.emailNotification != "ONLY IN CASE OF AN ERROR" &&
                    body.emailNotification != "NEVER") {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backupjob.create.invalid-emailnotification",
                        type: types_1.MessageType.error,
                        args: { emailNotification: body.emailNotification }
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
                if (!(yield sqliteConnection_1.database.loadBackupRepository(body.repoId))) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backupjob.create.repository-not-found",
                        type: types_1.MessageType.error,
                        args: { repoId: body.repoId.toString() }
                    });
                }
            }
            if (!errorOccured) {
                sqliteConnection_1.database.createBackupjob(body.repoId, body.name, body.maxBackups, body.emailNotification, body.backupLocations);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        {
                            name: "api.success.backupjob.create",
                            type: types_1.MessageType.success,
                            args: { name: body.name, repoid: body.repoId.toString() }
                        }
                    ]
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
router.post("/backupRepository", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(body.repoType &&
                body.repoName &&
                body.repoPassword &&
                body.autoUnlock &&
                body.repoLocation)) {
                errorOccured = true;
                if (!body.repoType) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoType",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.repoName) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoName",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.repoPassword) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoPassword",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.autoUnlock) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.autoUnlock",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.repoLocation) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoLocation",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.repoName) {
                if (yield sqliteConnection_1.database.loadBackupRepository(body.repoName)) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backuprepository.create.repo-already-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.repoType) {
                body.repoType = body.repoType.toUpperCase();
                if (body.repoType === "AMAZON S3") {
                    if (!(body.accessKey && body.secretAccessKey)) {
                        errorOccured = true;
                        if (!body.accessKey) {
                            errormessages.push({
                                name: "api.error.backuprepository.create.missing-data.accessKey",
                                type: types_1.MessageType.error
                            });
                        }
                        if (!body.secretAccessKey) {
                            errormessages.push({
                                name: "api.error.backuprepository.create.missing-data.secretAccessKey",
                                type: types_1.MessageType.error
                            });
                        }
                    }
                }
                else if (body.repoType != "LOCAL") {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.backuprepository.create.unknown-repo-type",
                        type: types_1.MessageType.error,
                        args: { repoType: body.repoType }
                    });
                }
            }
            if (!errorOccured) {
                if (body.repoType === "AMAZON S3") {
                    sqliteConnection_1.database.createAmazonS3BackupRepository(body.repoType, body.repoName, body.repoPassword, body.autoUnlock, body.repoLocation, body.accessKey, body.secretAccessKey);
                }
                if (body.repoType === "LOCAL") {
                    sqliteConnection_1.database.createLocalBackupRepository(body.repoType, body.repoName, body.repoPassword, body.autoUnlock, body.repoLocation);
                }
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        {
                            name: "api.success.backuprepository.create",
                            type: types_1.MessageType.success,
                            args: { name: body.repoName, type: body.repoType }
                        }
                    ]
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.backuprepository.create.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/userSettings", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(body.userId &&
                body.enableRegister &&
                body.automaticUpdates &&
                body.sendEmails &&
                body.reportLanguage &&
                body.language &&
                body.showSnackbar &&
                body.themePrimary &&
                body.themeSecondary &&
                body.themeAccent &&
                body.darktheme)) {
                errorOccured = true;
                if (!body.userId) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.userId",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.enableRegister) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.enableRegister",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.automaticUpdates) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.automaticUpdates",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.sendEmails) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.sendEmails",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.reportLanguage) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.reportLanguage",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.language) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.language",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.showSnackbar) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.showSnackbar",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.themePrimary) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.themePrimary",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.themeSecondary) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.themeSecondary",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.themeAccent) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.themeAccent",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.darktheme) {
                    errormessages.push({
                        name: "api.error.usersettings.create.missing-data.darktheme",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.userId) {
                if (yield sqliteConnection_1.database.loadUserSettingsByUserId(body.userId)) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.usersettings.create.settings-already-existing",
                        type: types_1.MessageType.error
                    });
                }
                if (!(yield sqliteConnection_1.database.loadUserById(body.userId))) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.usersettings.create.user-not-found",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.updateCheckInterval) {
                body.updateCheckInterval = body.updateCheckInterval.toUpperCase();
                if (body.updateCheckInterval != "HOURLY" &&
                    body.updateCheckInterval != "DAILY" &&
                    body.updateCheckInterval != "WEEKLY") {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.usersettings.create.invalid-updateCheckInterval",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.language) {
                body.language = body.language.toLowerCase();
                if (body.language != "de" && body.language != "en") {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.usersettings.create.invalid-language",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (!errorOccured) {
                sqliteConnection_1.database.createUserSetting(body.userId, body.enableRegister, body.automaticUpdates, body.updateCheckInterval, body.sendEmails, body.reportLanguage, body.smtpHostname, body.smtpPort, body.smtpUsername, body.smtpPassword, body.smtpFrom, body.smtpTo, body.language, body.showSnackbar, body.themePrimary, body.themeSecondary, body.themeAccent, body.darktheme);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.success.usersettings.create", type: types_1.MessageType.success }
                    ]
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.usersettings.create.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
exports.default = router;
//# sourceMappingURL=apiUser.js.map