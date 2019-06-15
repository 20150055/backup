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
const testFolders_1 = require("./testFolders");
exports.router = express.Router();
exports.router.get("/:userId/repository/:repoId/snapshot/:snapshotId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // const snapshotsDetails: ISnapshotDetails = callFunctionFromKathrin();
        // Temporary testdata
        const snapshotsDetails = {
            id: "3DA541559918A808C2402BBA5012F6C60B27661C".toLowerCase(),
            time: new Date().toString(),
            paths: ["D/users/admin"],
            tags: ["aaaaaaaa", "bbbbb"],
            files: testFolders_1.testFolders,
            hostname: "",
            short_id: "",
            tree: "",
            username: ""
        };
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                {
                    name: "api.success.backup.snapshots-details",
                    type: types_1.MessageType.success
                }
            ],
            payload: {
                details: snapshotsDetails
            }
        });
    });
});
//# sourceMappingURL=snapShotDetails.js.map