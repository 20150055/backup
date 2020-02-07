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
const types_1 = require("../../shared/types");
const sqliteConnection_1 = require("../../sqliteConnection");
const ApiResponse_1 = require("../../ApiResponse");
const uuidv4 = require("uuid/v4");
const logging_1 = require("../../logging");
const entity_1 = require("../../entity");
exports.router = express.Router();
exports.router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("register admin");
        const body = request.body;
        let errormessages = [];
        if (!body.username) {
            errormessages.push({
                name: "api.error.admin.register.missing-data.username",
                type: types_1.MessageType.error
            });
        }
        if (!body.password) {
            errormessages.push({
                name: "api.error.admin.register.missing-data.password",
                type: types_1.MessageType.error
            });
        }
        const exists = yield sqliteConnection_1.database.checkIfAdminExists();
        if (exists == true) {
            errormessages.push({
                name: "api.error.admin.already-exists",
                type: types_1.MessageType.error
            });
        }
        if (errormessages.length === 0) {
            let admin = new entity_1.Admin();
            admin.username = body.username;
            admin.password = body.password;
            admin = yield sqliteConnection_1.database.createAdmin(admin);
            const token = uuidv4();
            yield sqliteConnection_1.database.setAdminToken(admin.id, token);
            const responseObject = admin;
            let logInfo = {
                userId: admin.id,
                logLevel: types_1.LogLevel.success,
                eventDescription: "api.success.admin.register",
                type: types_1.LogType.other
            };
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [{ name: logInfo.eventDescription, type: types_1.MessageType.success }],
                payload: { admin: responseObject, token }
            });
        }
        else {
            let logInfo = {
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.admin.register",
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
//# sourceMappingURL=register.js.map