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
const ApiResponse_1 = require("../../../ApiResponse");
const logging_1 = require("../../../logging");
const types_1 = require("../../../shared/types");
exports.router = express.Router();
exports.router.get("/ping", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = { status: types_1.MessageType.success, eventDescription: "my event", logType: types_1.LogType.BackupJob };
        yield logging_1.createLog(log);
        ApiResponse_1.sendResponse(response, 200, { messages: [] });
    });
});
//# sourceMappingURL=index.js.map