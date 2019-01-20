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
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const enumTypes = require("../../../shared/types/enumTypes");
const UserSettings_1 = require("../../../entity/UserSettings");
function checkError(body, userId, insert) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        try {
            if (!(body.sendEmails &&
                body.reportLanguage &&
                body.language &&
                body.showSnackbar &&
                body.themePrimary &&
                body.themeSecondary &&
                body.themeAccent &&
                body.darktheme)) {
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
            if (body.reportLanguage) {
                if (body.reportLanguage != enumTypes.ReportLanguage.de &&
                    body.reportLanguage != enumTypes.ReportLanguage.en &&
                    body.reportLanguage != enumTypes.ReportLanguage.gui) {
                    errormessages.push({
                        name: "api.error.usersettings.create.invalid-ReportLanguage",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.language) {
                if (body.language != enumTypes.Language.de &&
                    body.language != enumTypes.Language.en) {
                    errormessages.push({
                        name: "api.error.usersettings.create.invalid-Language",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (userId) {
                if (insert && (yield sqliteConnection_1.database.loadUserSettingsByUserId(userId))) {
                    errormessages.push({
                        name: "api.error.usersettings.create.settings-already-existing",
                        type: types_1.MessageType.error
                    });
                }
                if (!(yield sqliteConnection_1.database.loadUserById(userId))) {
                    errormessages.push({
                        name: "api.error.usersettings.create.user-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            else {
                errormessages.push({
                    name: "api.error.usersettings.create.no-user-specified",
                    type: types_1.MessageType.error
                });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.usersettings.create.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
        }
        return errormessages;
    });
}
exports.checkError = checkError;
function setValues(body, userId) {
    let settings = new UserSettings_1.UserSettings;
    settings.user = userId;
    settings.sendEmails = body.sendEmails;
    settings.reportLanguage = body.reportLanguage;
    settings.smtpHostname = body.smtpHostname;
    settings.smtpPort = body.smtpPort;
    settings.smtpUsername = body.smtpUsername;
    settings.smtpPassword = body.smtpPassword;
    settings.smtpFrom = body.smtpFrom;
    settings.smtpTo = body.smtpTo;
    settings.language = body.language;
    settings.showSnackbar = body.showSnackbar;
    settings.themePrimary = body.themePrimary;
    settings.themeSecondary = body.themeSecondary;
    settings.themeAccent = body.themeAccent;
    settings.darktheme = body.darktheme;
    settings.defaultEmailNotification = body.defaultEmailNotification;
    settings.defaultMaxBackupsPerRepo = body.defaultMaxBackupsPerRepo;
    settings.defaultUnlockTime = body.defaultUnlockTime;
    return settings;
}
exports.setValues = setValues;
//# sourceMappingURL=functions.js.map