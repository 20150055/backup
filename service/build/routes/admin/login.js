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
const types_1 = require("../../shared/types");
const sqliteConnection_1 = require("../../sqliteConnection");
const ApiResponse_1 = require("../../ApiResponse");
exports.router = express.Router();
exports.router.post("/login", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        let admin;
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
                admin = yield sqliteConnection_1.database.loadAdminById(1);
                if (!admin) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.admin.login.user-not-found",
                        type: types_1.MessageType.error,
                        args: { admin: body.username }
                    });
                }
                else {
                    if (admin.password != sqliteConnection_1.database.hash(body.password)) {
                        errorOccured = true;
                        errormessages.push({
                            name: "api.error.admin.login.wrong-password",
                            type: types_1.MessageType.error
                        });
                    }
                }
            }
            if (!errorOccured && admin) {
                const token = uuidv4();
                yield sqliteConnection_1.database.setAdminToken(admin.id, token);
                /*let logInfo: CreateLogArgs = {
                  userId: user.id,
                  logLevel: LogLevel.success,
                  eventDescription: "api.success.user.login",
                  type: LogType.other
                };
          
                createLog(logInfo);*/
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "login success", type: types_1.MessageType.success }
                    ],
                    payload: { token: token, adminId: admin.id }
                });
            }
            else {
                /*let logInfo: CreateLogArgs = {
                  userId: (user) ? user.id : undefined,
                  logLevel: LogLevel.error,
                  eventDescription: "api.error.user.login",
                  message: "",
                  type: LogType.other
                };
          
                errormessages.forEach(message => {
                  logInfo.message += message.name + "\n";
                });
          
                createLog(logInfo);*/
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            /*let logInfo: CreateLogArgs = {
              userId: (user) ? user.id : undefined,
              logLevel: LogLevel.error,
              eventDescription: "api.error.user.login",
              message: "",
              type: LogType.other
            };*/
            errormessages.push({
                name: "api.error.admin.login.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
            /*errormessages.forEach(message => {
              logInfo.message += message.name + "\n";
            });
        
            createLog(logInfo);*/
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=login.js.map