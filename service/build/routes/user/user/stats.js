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
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const checkAuth_1 = require("../../checkAuth");
exports.router = express.Router();
exports.router.get("/:userId/stats", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(request.params.repoId);
        const stats = {
            numberOfSuccessfulRestoresThisMonth: 1,
            jobExecutionCount: {
                "january": {
                    successfulExecutions: 5,
                    failedExecutions: 1
                },
                "february": {
                    successfulExecutions: 4,
                    failedExecutions: 2
                },
                "march": {
                    successfulExecutions: 10,
                    failedExecutions: 6
                }
            }
        };
        // Testdata
        yield new Promise(resolve => setTimeout(resolve, 2000));
        ApiResponse_1.sendResponse(response, 200, {
            messages: [],
            payload: stats
        });
    });
});
//# sourceMappingURL=stats.js.map