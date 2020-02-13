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
const axios_1 = require("axios");
const fs = require("fs");
const path = require("path");
const functions_1 = require("./functions");
exports.router = express.Router();
const https = require("https");
exports.router.get("/client/:clientId/dir", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        const body = {
            path: typeof request.query.path !== "string" || request.query.path === "false"
                ? false
                : request.query.path
        };
        const client = yield sqliteConnection_1.database.loadClientWithClientUser(request.params.clientId);
        if (client) {
            if (fs.existsSync(path.join(__dirname, "clientcert" + client.id + ".pem"))) {
                const c = {
                    id: client.id,
                    ip: client.ip,
                    name: client.ip,
                    os: client.os
                };
                const fingerprint = functions_1.generateCertFingerprint(client);
                if (fingerprint == client.fingerprint) {
                    const responsedir = yield axios_1.default.get("https://" +
                        client.ip +
                        ":3000/api/system/directory?path=" +
                        body.path, {
                        timeout: 10000,
                        headers: {
                            Authorization: client.user.token,
                            "X-USERID": client.user.id
                        },
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false,
                        })
                    });
                    if (responsedir.data.payload) {
                        ApiResponse_1.sendResponse(response, 200, {
                            messages: [
                                { name: "api.success.client.dirs.get", type: types_1.MessageType.success }
                            ],
                            payload: { folder: responsedir.data.payload.folder }
                        });
                    }
                }
                else {
                    errormessages.push({
                        name: "api.error.admin.client.fetch-dirs.fingerprint-invalid",
                        type: types_1.MessageType.error
                    });
                    ApiResponse_1.sendResponse(response, 400, {
                        messages: errormessages
                    });
                }
            }
            else {
                errormessages.push({
                    name: "api.error.admin.client.fetch-dirs.certificate-invalid",
                    type: types_1.MessageType.error
                });
                ApiResponse_1.sendResponse(response, 400, {
                    messages: errormessages
                });
            }
        }
        else {
            errormessages.push({
                name: "api.error.admin.client.fetch-dirs.client-does-not-exist",
                type: types_1.MessageType.error
            });
            ApiResponse_1.sendResponse(response, 400, {
                messages: errormessages
            });
        }
    });
});
//# sourceMappingURL=fetchDirsFromClient.js.map