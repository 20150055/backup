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
exports.router.post("/client/:clientId/addUser", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientUser = request.body;
        const user = clientUser;
        const responseUser = yield axios_1.default.post("http://" + clientUser.ip + ":8380/api/user/register", user, {
            timeout: 5000
        });
        const client = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
        if (client) {
            const userEntity = new ClientUser_1.ClientUser();
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
                console.log("payload", responseUser.data.payload);
                yield sqliteConnection_1.database.createClientUser(userEntity);
                yield sqliteConnection_1.database.createClient(client);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.success.client.user.create", type: types_1.MessageType.success }
                    ]
                });
            }
        }
    });
});
//# sourceMappingURL=addUserToClient.js.map