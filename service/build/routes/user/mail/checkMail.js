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
exports.router = express.Router();
exports.router.get("/:userId/mail", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield sqliteConnection_1.database.loadUserSettingsByUserId(request.params.userId);
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
            yield transporter.verify();
        }
        catch (error) {
            let errorstring = error.toString();
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.mail.verify",
                        type: types_1.MessageType.error,
                        args: { error: errorstring }
                    }
                ]
            });
        }
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                {
                    name: "api.success.mail.verify",
                    type: types_1.MessageType.success
                }
            ]
        });
    });
});
//# sourceMappingURL=checkMail.js.map