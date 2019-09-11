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
const ClientUser_1 = require("../../../entity/ClientUser");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
exports.router.get("/client/:clientId/user", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        try {
            const client = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
            if (client) {
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
                const responseUser = yield axios_1.default.get("http://" + client.ip + ":8380/api/user/1", {
                    headers: {
                        Authorization: user.token
                    },
                    timeout: 3000
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
                            { name: "api.success.client.user.get", type: types_1.MessageType.success }
                        ],
                        payload: { user: userEntity }
                    });
                }
            }
            else {
                ApiResponse_1.sendResponse(response, 400, {
                    messages: [
                        { name: "api.error.client.user.get", type: types_1.MessageType.error }
                    ]
                });
            }
        }
        catch (e) {
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
            ApiResponse_1.sendResponse(response, 400, {
                messages: errormessages
            });
        }
    });
});
//# sourceMappingURL=fetchUserFromClient.js.map