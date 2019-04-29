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
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.post("/login", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        let user;
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
                user = yield sqliteConnection_1.database.loadUserByUsername(body.username);
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
            if (!errorOccured && user) {
                const token = uuidv4();
                yield sqliteConnection_1.database.setUserToken(user.id, token);
                let logInfo = {
                    userId: user.id,
                    logLevel: types_1.LogLevel.success,
                    eventDescription: "api.success.user.login",
                    type: types_1.LogType.other
                };
                logging_1.createLog(logInfo);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: logInfo.eventDescription, type: types_1.MessageType.success }
                    ],
                    payload: { token: token, userId: user.id }
                });
            }
            else {
                let logInfo = {
                    userId: (user) ? user.id : undefined,
                    logLevel: types_1.LogLevel.error,
                    eventDescription: "api.error.user.login",
                    message: "",
                    type: types_1.LogType.other
                };
                errormessages.forEach(message => {
                    logInfo.message += message.name + "\n";
                });
                logging_1.createLog(logInfo);
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            let logInfo = {
                userId: (user) ? user.id : undefined,
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.user.login",
                message: "",
                type: types_1.LogType.other
            };
            errormessages.push({
                name: "api.error.user.login.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            errormessages.forEach(message => {
                logInfo.message += message.name + "\n";
            });
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=login.js.map