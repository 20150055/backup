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
const fs = require("fs");
const axios_1 = require("axios");
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const path = require("path");
const functions_1 = require("./functions");
const https = require("https");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
exports.router.post("/client/:clientId/repository", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let repositoryClient = request.body;
        const clientId = request.params.clientId;
        const client = yield sqliteConnection_1.database.loadClientWithClientUser(clientId);
        let errormessages = [];
        if (client) {
            if (fs.existsSync(path.join(__dirname, "clientcert" + client.id + ".pem"))) {
                const user = client.user;
                if (user === null) {
                    errormessages.push({
                        name: "api.error.admin.client.create-repo.missing-user",
                        type: types_1.MessageType.error
                    });
                    ApiResponse_1.sendResponse(response, 400, {
                        messages: errormessages
                    });
                }
                else {
                    try {
                        const fingerprint = functions_1.generateCertFingerprint(client);
                        if (fingerprint == client.fingerprint) {
                            const repo = repositoryClient.repo;
                            const resp = yield axios_1.default.post("https://" +
                                repositoryClient.ip +
                                ":3000/api/user/" +
                                user.id +
                                "/repository", repo, {
                                headers: {
                                    Authorization: user.token
                                },
                                timeout: 20000,
                                httpsAgent: new https.Agent({
                                    rejectUnauthorized: false,
                                })
                            });
                            if (resp) {
                                if (resp.data.payload) {
                                    ApiResponse_1.sendResponse(response, 200, {
                                        messages: [
                                            {
                                                name: "api.success.client.create.repo",
                                                type: types_1.MessageType.success
                                            }
                                        ],
                                        payload: { repo: resp.data.payload.repo }
                                    });
                                }
                            }
                        }
                        else {
                            errormessages.push({
                                name: "api.error.admin.client.create-repository.fingerprint-invalid",
                                type: types_1.MessageType.error
                            });
                            ApiResponse_1.sendResponse(response, 400, {
                                messages: errormessages
                            });
                        }
                    }
                    catch (e) {
                        if (e.response === undefined) {
                            errormessages.push({
                                name: "api.error.admin.client.create-repo.backup-not-answering",
                                type: types_1.MessageType.error
                            });
                        }
                        else {
                            console.log("error", e.response.data.messages);
                            errormessages.push({
                                name: "api.error.admin.client.create-repo.unknown-error",
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
                    name: "api.error.admin.client.create-repository.certificate-invalid",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages
                });
            }
        }
        else {
            errormessages.push({
                name: "api.error.admin.client.create-repository.client-does-not-exist",
                type: types_1.MessageType.error
            });
            ApiResponse_1.sendResponse(response, 400, {
                messages: errormessages
            });
        }
    });
});
/*
    const clientRepo: LocalS3BackupRepository = {
      accessKey: repo.data.payload.accessKey,
      archived: repo.data.payload.archived,
      autoUnlock: repo.data.payload.autoUnlock,
      id: repo.data.payload.id,
      log: null,
      backupjob: null,
      repoLocation: repo.data.payload.repoLocation,
      repoName: repo.data.payload.repoLocation,
      repoPassword: repo.data.payload.repoPassword,
      repoType: repo.data.payload.repoType,
      secretAccessKey: repo.data.payload.secretAccessKey,
      user: user.id
    };
    const repos = user.repo;
    repos.push(clientRepo);
    user.repo = repos;
    client.user = user;
    await database.createClient(client);*/
//# sourceMappingURL=createRepositoryOnClient.js.map