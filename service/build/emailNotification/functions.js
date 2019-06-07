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
const nodemailer = require("nodemailer");
const types_1 = require("../shared/types");
const sqliteConnection_1 = require("../sqliteConnection");
const logging_1 = require("../logging");
const log_1 = require("../util/log");
const generateHTML_1 = require("./generateHTML");
function sendEmail(userId, notification, subject, templateData) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield sqliteConnection_1.database.loadUserSettingsByUserId(userId);
        try {
            if (!settings) {
                throw Error("Unable to find UserSettings!");
            }
            if (!(notification === types_1.EmailNotification.never ||
                (notification === types_1.EmailNotification.onerror &&
                    templateData.logLevel != types_1.LogLevel.error) ||
                settings.sendEmails != true)) {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: settings.smtpHostname,
                    port: settings.smtpPort,
                    secure: false,
                    auth: {
                        user: settings.smtpFrom,
                        pass: settings.smtpPassword // password
                    }
                });
                // setup email data
                let mailOptions = {
                    sender: settings.smtpFrom,
                    to: settings.smtpTo,
                    subject: subject,
                    // text: text, // plain text body
                    html: yield generateHTML_1.generateHTMLTemplate(settings.reportLanguage, templateData)
                };
                yield transporter.sendMail(mailOptions); //retValue.messageId
                log_1.log.devOnly("Mail sent");
                let logInfo = {
                    userId: userId,
                    logLevel: types_1.LogLevel.success,
                    eventDescription: "api.success.mail.send",
                    type: types_1.LogType.other,
                    message: `Sent from ${settings.smtpFrom}\nTo ${settings.smtpTo}\n`
                };
                logging_1.createLog(logInfo);
                return true;
            }
            else {
                log_1.log.devOnly("No Mail sent / Loglevel = " +
                    templateData.logLevel +
                    ", sendMail = " +
                    settings.sendEmails);
                return true;
            }
        }
        catch (error) {
            let errorstring = error.toString();
            let logInfo = {
                userId: userId,
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.mail.send",
                message: errorstring,
                type: types_1.LogType.other
            };
            logging_1.createLog(logInfo);
            log_1.log.devOnly("Mail error: " + errorstring);
            return errorstring;
        }
    });
}
exports.sendEmail = sendEmail;
function checkMailConfig(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield sqliteConnection_1.database.loadUserSettingsByUserId(userId);
        try {
            if (!settings) {
                throw Error("Unable to find UserSettings!");
            }
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: settings.smtpHostname,
                port: settings.smtpPort,
                secure: false,
                auth: {
                    user: settings.smtpFrom,
                    pass: settings.smtpPassword // password
                }
            });
            yield transporter.verify();
        }
        catch (error) {
            return error.toString();
        }
        return true;
    });
}
exports.checkMailConfig = checkMailConfig;
//# sourceMappingURL=functions.js.map