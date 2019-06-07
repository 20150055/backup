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
const date_fns_1 = require("date-fns");
exports.router = express.Router();
exports.router.get("/:userId/repository/:repoId/snapshot", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // const snapshots: ISnapshot[] = callFunctionFromKathrin();
        // Temporary testdata
        const snapshots = [
            {
                id: "CAFFEA594F9F1D6948E059F1BB5D29088CEE4883".toLowerCase(),
                date: date_fns_1.parse("05-12-2019"),
                paths: [],
                tags: ["asfsdfasdf"]
            },
            {
                id: "3DA541559918A808C2402BBA5012F6C60B27661C".toLowerCase(),
                date: new Date(),
                paths: ["D/users/admin"],
                tags: ["aaaaaaaa", "bbbbb"]
            }
        ];
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                {
                    name: "api.success.backup.list-snapshots",
                    type: types_1.MessageType.success
                }
            ],
            payload: {
                snapshots: snapshots
            }
        });
    });
});
//# sourceMappingURL=listSnapshots.js.map