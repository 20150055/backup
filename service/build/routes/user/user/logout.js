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
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.delete("/login/:userId", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = request.params.userId;
        let user = yield sqliteConnection_1.database.loadUserById(userId);
        if (user) {
            user.token = "";
            let logInfo = {
                userId: user.id,
                logLevel: types_1.LogLevel.success,
                eventDescription: "api.success.user.logout",
                type: types_1.LogType.other
            };
            logging_1.createLog(logInfo);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [{ name: logInfo.eventDescription, type: types_1.MessageType.success }]
            });
            return;
        }
        let logInfo = {
            userId: userId,
            logLevel: types_1.LogLevel.error,
            eventDescription: "api.error.user.logout",
            type: types_1.LogType.other
        };
        logging_1.createLog(logInfo);
        ApiResponse_1.sendResponse(response, 400, {
            messages: [{ name: logInfo.eventDescription, type: types_1.MessageType.error }]
        });
    });
});
//# sourceMappingURL=logout.js.map