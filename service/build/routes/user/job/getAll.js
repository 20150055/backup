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
const checkAuth_1 = require("../../checkAuth");
exports.router = express.Router();
exports.router.get("/:userId/backupJob", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobs = yield sqliteConnection_1.database.loadAllBackupJobById(request.params.userId);
        const responseObjects = [];
        jobs.forEach(job => {
            if (!job.archived) {
                responseObjects.push(job);
            }
        });
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                { name: "api.success.backuprepository.getAll", type: types_1.MessageType.success }
            ],
            payload: { jobs: responseObjects }
        });
    });
});
//# sourceMappingURL=getAll.js.map