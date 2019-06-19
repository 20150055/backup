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
const types_1 = require("../../../../shared/types");
const ApiResponse_1 = require("../../../../ApiResponse");
const checkAuth_1 = require("../../../checkAuth");
const app_1 = require("../../../../app");
const sqliteConnection_1 = require("../../../../sqliteConnection");
const scheduling_1 = require("../../../../scheduling");
exports.router = express.Router();
exports.router.post("/:userId/repository/:repoId/restore", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const repoId = request.params.repoId;
        const repository = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(repoId);
        if (!repository) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.backup.restore-snapshot.repository-not-existing",
                        type: types_1.MessageType.error
                    }
                ]
            });
            return;
        }
        let resticOutput;
        app_1.io.of("/api/").emit("restore started");
        if (repository.repoType === types_1.RepoType.Local) {
            resticOutput = yield scheduling_1.restoreSnapshot({
                location: repository.repoLocation,
                password: repository.repoPassword,
                type: repository.repoType
            }, {
                restorePath: body.restorePath,
                selectedPaths: body.selectedPaths,
                snapshotId: body.snapshotId
            });
        }
        else {
            resticOutput = yield scheduling_1.restoreSnapshot({
                location: repository.repoLocation,
                password: repository.repoPassword,
                type: repository.repoType,
                s3AccessKey: repository.accessKey,
                s3SecretKey: repository.secretAccessKey
            }, {
                restorePath: body.restorePath,
                selectedPaths: body.selectedPaths,
                snapshotId: body.snapshotId
            });
        }
        // io.of("/api/").emit("progress", 120, 300);
        app_1.io.of("/api/").emit("restore finished");
        if (resticOutput.success) {
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.backup.restore-snapshot",
                        type: types_1.MessageType.success
                    }
                ],
                payload: {}
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.backup.restore-snapshot",
                        type: types_1.MessageType.error,
                        args: { resticOutput: resticOutput.fullOutput }
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=restoreSnapshot.js.map