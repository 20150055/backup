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
const https = require("https");
const ClientUser_1 = require("../../../entity/ClientUser");
const functions_1 = require("./functions");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
exports.router.post("/client/:clientId/addUser", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("received add User request");
        console.log("request", request.body);
        const clientUser = request.body;
        const user = clientUser;
        let errormessages = [];
        const client = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
        console.log("client", client);
        console.log("clientuser", clientUser);
        try {
            if (client) {
                if (fs.existsSync(path.join(__dirname, "clientcert" + client.id + ".pem"))) {
                    const fingerprint = functions_1.generateCertFingerprint(client);
                    if (fingerprint == client.fingerprint) {
                        console.log("addUser-passed fingerprint");
                        console.log("user", user);
                        const responseUser = yield axios_1.default.post("https://" + clientUser.ip + ":3000/api/user/register", user, {
                            timeout: 5000,
                            httpsAgent: new https.Agent({
                                rejectUnauthorized: false,
                            })
                        });
                        const userEntity = new ClientUser_1.ClientUser();
                        console.log("responseUser", responseUser);
                        if (responseUser.data.payload) {
                            (userEntity.archived = responseUser.data.payload.user.archived),
                                (userEntity.email = responseUser.data.payload.user.email),
                                (userEntity.firstName = responseUser.data.payload.user.firstName),
                                (userEntity.id = responseUser.data.payload.user.id),
                                (userEntity.lastName = responseUser.data.payload.user.lastName),
                                (userEntity.password = responseUser.data.payload.user.password),
                                (userEntity.token = responseUser.data.payload.token),
                                (userEntity.username = user.username);
                            client.user = userEntity;
                            console.log("adding User", userEntity);
                            yield sqliteConnection_1.database.createClientUser(userEntity);
                            yield sqliteConnection_1.database.createClient(client);
                            ApiResponse_1.sendResponse(response, 200, {
                                messages: [
                                    {
                                        name: "api.success.client.user.create",
                                        type: types_1.MessageType.success
                                    }
                                ]
                            });
                        }
                    }
                    else {
                        errormessages.push({
                            name: "api.error.admin.client.add-user.fingerprint-invalid",
                            type: types_1.MessageType.error
                        });
                        ApiResponse_1.sendResponse(response, 400, {
                            messages: errormessages
                        });
                    }
                }
                else {
                    errormessages.push({
                        name: "api.error.admin.client.add-user.certificate-invalid",
                        type: types_1.MessageType.error
                    });
                    ApiResponse_1.sendResponse(response, 400, {
                        messages: errormessages
                    });
                }
            }
            else {
                errormessages.push({
                    name: "api.error.admin.client.add-user.client-does-not-exist",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages,
                });
            }
        }
        catch (e) {
            if (e.response === undefined) {
                errormessages.push({
                    name: "api.error.admin.client.add-user.backup-not-answering",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages
                });
            }
        }
    });
});
//# sourceMappingURL=addUserToClient.js.map