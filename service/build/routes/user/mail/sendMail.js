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
const nodemailer = require("nodemailer");
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const checkAuth_1 = require("../../checkAuth");
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.post("/:userId/mail", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield sqliteConnection_1.database.loadUserSettingsByUserId(request.params.userId);
        const body = request.body;
        try {
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
                subject: body.subject,
                text: body.text,
                html: ""
            };
            yield transporter.sendMail(mailOptions); //retValue.messageId
        }
        catch (error) {
            let errorstring = error.toString();
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.mail.send",
                message: errorstring,
                type: types_1.LogType.other
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
            return;
        }
        let logInfo = {
            userId: request.params.userId,
            logLevel: types_1.LogLevel.success,
            eventDescription: "api.success.mail.send",
            type: types_1.LogType.other,
            message: `Sent from ${settings.smtpFrom}\nTo ${settings.smtpTo}\n`
        };
        logging_1.createLog(logInfo);
        ApiResponse_1.sendResponse(response, 200, {
            messages: [{ name: logInfo.eventDescription, type: types_1.MessageType.success }]
        });
    });
});
//# sourceMappingURL=sendMail.js.map