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
const ClientUser_1 = require("../../../entity/ClientUser");
const functions_1 = require("./functions");
const https = require("https");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
exports.router.get("/client/:clientId/user", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        try {
            const client = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
            if (client) {
                if (fs.existsSync(path.join(__dirname, "clientcert" + client.id + ".pem"))) {
                    const fingerprint = functions_1.generateCertFingerprint(client);
                    //console.log("fingerprint", fingerprint);
                    if (fingerprint == client.fingerprint) {
                        const user = client.user;
                        //console.log("user", client);
                        if (user === undefined) {
                            errormessages.push({
                                name: "api.error.admin.client.fetch-user.missing-user",
                                type: types_1.MessageType.error
                            });
                            ApiResponse_1.sendResponse(response, 400, {
                                messages: errormessages
                            });
                        }
                        const responseUser = yield axios_1.default.get("https://" + client.ip + ":3000/api/user/1", {
                            headers: {
                                Authorization: user.token
                            },
                            timeout: 3000,
                            httpsAgent: new https.Agent({
                                rejectUnauthorized: false,
                            })
                        });
                        const userEntity = new ClientUser_1.ClientUser();
                        if (responseUser.data.payload) {
                            (userEntity.archived = responseUser.data.payload.user.archived),
                                (userEntity.email = responseUser.data.payload.user.email),
                                (userEntity.firstName = responseUser.data.payload.user.firstName),
                                (userEntity.id = responseUser.data.payload.user.id),
                                (userEntity.lastName = responseUser.data.payload.user.lastName),
                                (userEntity.password = responseUser.data.payload.user.password),
                                (userEntity.token = responseUser.data.payload.token),
                                (userEntity.username = responseUser.data.payload.user.username);
                            client.user = userEntity;
                            yield sqliteConnection_1.database.createClient(client);
                            ApiResponse_1.sendResponse(response, 200, {
                                messages: [
                                    {
                                        name: "api.success.client.user.get",
                                        type: types_1.MessageType.success
                                    }
                                ],
                                payload: { user: userEntity }
                            });
                        }
                    }
                    else {
                        errormessages.push({
                            name: "api.error.admin.client.fetch-user.fingerprint-invalid",
                            type: types_1.MessageType.error
                        });
                        ApiResponse_1.sendResponse(response, 400, {
                            messages: errormessages
                        });
                    }
                }
                else {
                    errormessages.push({
                        name: "api.error.admin.client.fetch-user.certificate-invalid",
                        type: types_1.MessageType.error
                    });
                    ApiResponse_1.sendResponse(response, 400, {
                        messages: errormessages
                    });
                }
            }
            else {
                errormessages.push({
                    name: "api.error.admin.client.fetch-user.client-does-not-exist",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages
                });
            }
        }
        catch (e) {
            console.log("error", e);
            if (e.response === undefined) {
                errormessages.push({
                    name: "api.error.admin.client.get-user.backup-not-answering",
                    type: types_1.MessageType.error
                });
            }
            else {
                errormessages.push({
                    name: "api.error.admin.client.get-user.unknown-error",
                    type: types_1.MessageType.error
                });
            }
        }
    });
});
//# sourceMappingURL=fetchUserFromClient.js.map