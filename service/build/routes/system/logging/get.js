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
const ApiResponse_1 = require("../../../ApiResponse");
const path = require("path");
const sqliteConnection_1 = require("../../../sqliteConnection");
const functions_1 = require("./functions");
exports.router = express.Router();
exports.router.get("/log/:logId", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const logId = request.params.logId;
        const log = yield sqliteConnection_1.database.loadLogById(logId);
        if (!log) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.system.log.log-not-existing",
                        type: types_1.MessageType.error
                    }
                ]
            });
            return;
        }
        // Build path to logfile
        let logPath = path.join(path.dirname(path.dirname(path.dirname(path.dirname(__dirname)))), "logs");
        logPath = path.join(logPath, log.logType);
        logPath = path.join(logPath, "log.txt");
        ApiResponse_1.sendResponseFile(response, 200, logPath);
    });
});
exports.router.get("/log", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let logs;
        logs = yield functions_1.getParsedDBLogs(body);
        logs = functions_1.filterOffsetLimit(body, logs);
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                {
                    name: "api.success.system.log",
                    type: types_1.MessageType.success
                }
            ],
            payload: {
                logs: logs
            }
        });
    });
});
//# sourceMappingURL=get.js.map