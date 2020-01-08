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
exports.router = express.Router();
exports.router.get("/client/:clientId/dir", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            path: typeof request.query.path !== "string" || request.query.path === "false"
                ? false
                : request.query.path
        };
        const client = yield sqliteConnection_1.database.loadClientWithClientUser(request.params.clientId);
        if (client) {
            const c = {
                id: client.id,
                ip: client.ip,
                name: client.ip,
                os: client.os
            };
            const responsedir = yield axios_1.default.get("https://" + client.ip + ":8380/api/system/directory?path=" + body.path, {
                timeout: 10000,
                headers: {
                    Authorization: client.user.token,
                    "X-USERID": client.user.id
                },
            });
            if (responsedir.data.payload) {
                console.log("dir", responsedir.data.payload.folder);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.success.client.dir.get", type: types_1.MessageType.success }
                    ],
                    payload: { folder: responsedir.data.payload.folder }
                });
            }
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    { name: "api.error.client.get.missing-client", type: types_1.MessageType.error }
                ]
            });
        }
    });
});
//# sourceMappingURL=fetchDirsFromClient.js.map