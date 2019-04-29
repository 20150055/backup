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
const functions_1 = require("./functions");
const checkAuth_1 = require("../../checkAuth");
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.put("/:userId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const oldUser = yield sqliteConnection_1.database.loadUserById(request.params.userId);
        if (!oldUser) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.user.patch.user-not-existing",
                        type: types_1.MessageType.success
                    }
                ]
            });
            return;
        }
        let errormessages = yield functions_1.checkError(body, request.params.userId, false);
        if (errormessages.length === 0) {
            let newUser = functions_1.setValues(body);
            newUser.id = oldUser.id;
            newUser.job = oldUser.job;
            newUser.repo = oldUser.repo;
            newUser.token = oldUser.token; // TODO: Sicher?
            newUser = yield sqliteConnection_1.database.createUser(newUser);
            const responseObject = newUser;
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.success,
                eventDescription: "api.success.user.update",
                type: types_1.LogType.other
            };
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 200, {
                //TODO with ...Update...
                messages: [
                    { name: logInfo.eventDescription, type: types_1.MessageType.success }
                ],
                payload: { user: responseObject }
            });
        }
        else {
            let logInfo = {
                userId: request.params.userId,
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.user.update",
                message: "",
                type: types_1.LogType.other
            };
            errormessages.forEach(message => {
                logInfo.message += message.name + "\n";
            });
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=update.js.map