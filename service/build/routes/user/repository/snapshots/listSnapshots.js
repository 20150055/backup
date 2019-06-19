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
const sqliteConnection_1 = require("../../../../sqliteConnection");
const scheduling_1 = require("../../../../scheduling");
exports.router = express.Router();
exports.router.get("/:userId/repository/:repoId/snapshot", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoId = request.params.repoId;
        const repository = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(repoId);
        if (!repository) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.backup.list-snapshots.repository-not-existing",
                        type: types_1.MessageType.error
                    }
                ]
            });
            return;
        }
        let resticOutput;
        if (repository.repoType === types_1.RepoType.Local) {
            resticOutput = yield scheduling_1.listSnapshots({
                location: repository.repoLocation,
                password: repository.repoPassword,
                type: repository.repoType
            });
        }
        else {
            resticOutput = yield scheduling_1.listSnapshots({
                location: repository.repoLocation,
                password: repository.repoPassword,
                type: repository.repoType,
                s3AccessKey: repository.accessKey,
                s3SecretKey: repository.secretAccessKey
            });
        }
        if (!resticOutput.success) {
            // TODO: may produce an error (add " | resticOutput.success === 'false'")
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.backup.list-snapshots",
                        type: types_1.MessageType.error,
                        args: { resticOutput: resticOutput.fullOutput }
                    }
                ]
            });
            return;
        }
        // const snapshots: ISnapshot[] = [
        //   {
        //     id: "CAFFEA594F9F1D6948E059F1BB5D29088CEE4883".toLowerCase(),
        //     paths: [],
        //     tags: ["asfsdfasdf"],
        //     hostname: "",
        //     short_id: "",
        //     time: new Date().toString(),
        //     tree: "",
        //     username: ""
        //   }
        // ];
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                {
                    name: "api.success.backup.list-snapshots",
                    type: types_1.MessageType.success
                }
            ],
            payload: {
                snapshots: resticOutput.snapshots
            }
        });
    });
});
//# sourceMappingURL=listSnapshots.js.map