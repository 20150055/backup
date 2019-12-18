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
const scheduling_1 = require("../../../scheduling");
exports.router = express.Router();
exports.router.get("/:userId/repository/:repoId/stats", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(request.params.repoId);
        const stats = {
            filesBackedUpInLastSnapshot: 0,
            numberOfSnapshots: 0
        };
        if (repo) {
            let resticOutputSnapshots;
            if (repo.repoType === types_1.RepoType.Local) {
                resticOutputSnapshots = yield scheduling_1.listSnapshots({
                    location: repo.repoLocation,
                    password: repo.repoPassword,
                    type: repo.repoType
                });
            }
            else {
                resticOutputSnapshots = yield scheduling_1.listSnapshots({
                    location: repo.repoLocation,
                    password: repo.repoPassword,
                    type: repo.repoType,
                    s3AccessKey: repo.accessKey,
                    s3SecretKey: repo.secretAccessKey
                });
            }
            if (resticOutputSnapshots.success) {
                stats.numberOfSnapshots = resticOutputSnapshots.snapshots.length;
                let snapshotID = resticOutputSnapshots.snapshots[resticOutputSnapshots.snapshots.length - 1].id;
                let resticOutputFiles;
                if (repo.repoType === types_1.RepoType.Local) {
                    resticOutputFiles = yield scheduling_1.listFiles({
                        location: repo.repoLocation,
                        password: repo.repoPassword,
                        type: repo.repoType
                    }, snapshotID);
                }
                else {
                    resticOutputFiles = yield scheduling_1.listFiles({
                        location: repo.repoLocation,
                        password: repo.repoPassword,
                        type: repo.repoType,
                        s3AccessKey: repo.accessKey,
                        s3SecretKey: repo.secretAccessKey
                    }, snapshotID);
                }
                if (resticOutputFiles.success) {
                    stats.filesBackedUpInLastSnapshot = resticOutputFiles.files.length;
                }
            }
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [],
                payload: stats
            });
        }
        ApiResponse_1.sendResponse(response, 200, {
            messages: [],
            payload: stats
        });
    });
});
//# sourceMappingURL=stats.js.map