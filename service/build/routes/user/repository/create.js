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
const enumTypes_1 = require("../../../shared/types/enumTypes");
const checkAuth_1 = require("../../checkAuth");
const functions_1 = require("./functions");
exports.router = express.Router();
exports.router.post("/:userId/repository", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errormessages = yield functions_1.checkError(body, request.params.userId, null);
        if (errormessages.length === 0) {
            let repo = functions_1.setValues(body, request.params.userId);
            if (body.repoType === enumTypes_1.RepoType.S3) {
                repo.accessKey = body.accessKey;
                repo.secretAccessKey = body.secretAccessKey;
                yield sqliteConnection_1.database.createS3BackupRepository(repo);
            }
            else {
                yield sqliteConnection_1.database.createLocalBackupRepository(repo);
            }
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.backuprepository.create",
                        type: types_1.MessageType.success
                    }
                ],
                payload: { repo: repo }
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=create.js.map