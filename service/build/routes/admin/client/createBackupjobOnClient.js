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
exports.router.post("/client/:clientId/backupJob", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let backupjobClient = request.body;
        const clientId = request.params.clientId;
        const client = yield sqliteConnection_1.database.loadClientWithClientUser(clientId);
        let errormessages = [];
        if (client) {
            const user = client.user;
            if (user === null) {
                errormessages.push({
                    name: "api.error.admin.client.create-backupjob.missing-user",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages
                });
            }
            else {
                try {
                    const resp = yield axios_1.default.post("http://" +
                        backupjobClient.ip +
                        ":8380/api/user/" +
                        user.id +
                        "/backupJob", backupjobClient.backupjob, {
                        headers: {
                            Authorization: user.token
                        },
                        timeout: 5000
                    });
                    if (resp.data.payload) {
                        ApiResponse_1.sendResponse(response, 200, {
                            messages: [
                                {
                                    name: "api.success.client.create.job",
                                    type: types_1.MessageType.success
                                }
                            ],
                            payload: { job: resp.data.payload.job }
                        });
                        /*const clientJob: BackupJob = {
                      active: job.data.payload.active,
                      archived: job.data.payload.archived,
                      backupLocations: job.data.payload.backupLocations,
                      cronInterval: job.data.payload.cronInterval,
                      id: job.data.payload.id,
                      emailNotification: job.data.payload.emailNotification,
                      log: null,
                      maxBackups: job.data.payload.maxBackups,
                      name: job.data.payload.name,
                      prevScheduledDate: job.data.payload.prevScheduledDate,
                      repoId: job.data.payload.repoId,
                      startDate: job.data.payload.startDate,
                      user: user.id
                    };*/
                        /*const jobs = user.job;
                    jobs.push(clientJob);
                    user.job = jobs;
                    client.user = user;
                    await database.createClient(client);*/
                    }
                }
                catch (e) {
                    console.log("error", e);
                    if (e.response === undefined) {
                        errormessages.push({
                            name: "api.error.admin.client.create-backupjob.backup-not-answering",
                            type: types_1.MessageType.error
                        });
                    }
                    else {
                        errormessages.push({
                            name: "api.error.admin.client.create-backupjob.unknown-error",
                            type: types_1.MessageType.error
                        });
                    }
                    ApiResponse_1.sendResponse(response, 400, {
                        messages: errormessages
                    });
                }
            }
        }
        else {
            errormessages.push({
                name: "api.error.admin.client.create.backupjob",
                type: types_1.MessageType.error
            });
            ApiResponse_1.sendResponse(response, 400, {
                messages: errormessages
            });
        }
    });
});
//# sourceMappingURL=createBackupjobOnClient.js.map