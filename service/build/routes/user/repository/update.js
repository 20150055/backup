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
exports.router.put("/:userId/repository/:repoId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const repoId = request.params.repoId;
        let errormessages = yield functions_1.checkError(body, request.params.userId, repoId);
        if (errormessages.length === 0) {
            const oldRepo = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(repoId);
            let newRepo = functions_1.setValues(body, request.params.userId);
            newRepo.id = oldRepo.id;
            newRepo.user = oldRepo.user;
            newRepo.log = oldRepo.log;
            newRepo.backupjob = oldRepo.backupjob;
            if (body.repoType === enumTypes_1.RepoType.S3) {
                newRepo.accessKey = body.accessKey;
                newRepo.secretAccessKey = body.secretAccessKey;
                newRepo = yield sqliteConnection_1.database.createS3BackupRepository(newRepo);
            }
            else {
                newRepo = yield sqliteConnection_1.database.createLocalBackupRepository(newRepo);
            }
            const responseObject = newRepo;
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.backuprepository.create",
                        type: types_1.MessageType.success
                    }
                ],
                payload: { repo: responseObject }
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=update.js.map