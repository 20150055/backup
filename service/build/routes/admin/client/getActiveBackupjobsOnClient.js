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
const axios_1 = require("axios");
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const path = require("path");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
exports.router.get("/client/:clientId/activeBackupjobs", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        const clientId = request.params.clientId;
        const client = yield sqliteConnection_1.database.loadClientWithClientUser(clientId);
        if (client) {
            const user = client.user;
            if (user === null) {
                errormessages.push({
                    name: "api.error.admin.client.getactivebackupjobs.missing-user",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages
                });
            }
            else {
                const responseObjects = [];
                try {
                    const resp = yield axios_1.default.get("http://" + client.ip + ":8380/api/user/" + user.id + "/backupJob", {
                        headers: {
                            Authorization: user.token
                        },
                        timeout: 4000
                    });
                    if (resp) {
                        if (resp.data.payload) {
                            ApiResponse_1.sendResponse(response, 200, {
                                messages: [],
                                payload: { jobs: resp.data.payload.jobs }
                            });
                        }
                    }
                }
                catch (e) {
                    if (e.response === undefined) {
                        errormessages.push({
                            name: "api.error.admin.client.check-install-status.backup-not-answering",
                            type: types_1.MessageType.error
                        });
                    }
                    ApiResponse_1.sendResponse(response, 200, {
                        messages: errormessages
                    });
                }
            }
        }
        else {
            errormessages.push({
                name: "api.error.admin.client.check-install-status.client-does-not-exist",
                type: types_1.MessageType.error
            });
            ApiResponse_1.sendResponse(response, 400, {
                messages: errormessages
            });
        }
    });
});
//# sourceMappingURL=getActiveBackupjobsOnClient.js.map