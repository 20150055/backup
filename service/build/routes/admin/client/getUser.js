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
exports.router = express.Router();
exports.router.get("/client/:clientId/getUser", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("received get User", request.params.clientId);
        const clients = yield sqliteConnection_1.database.loadAllClients();
        const client = clients.find(c => {
            return c.id == request.params.clientId;
        });
        if (client) {
            console.log("getUser", client);
            if (client.user) {
                const c = {
                    username: client.user.username,
                    password: client.user.password
                };
                console.log("clientuser", client.user);
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [{ name: "api.success.client.get", type: types_1.MessageType.success }],
                    payload: { user: c }
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, {
                    messages: [
                        {
                            name: "api.error.client.get-user.missing-user",
                            type: types_1.MessageType.error
                        }
                    ]
                });
            }
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.client.get-user.missing-client",
                        type: types_1.MessageType.error
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=getUser.js.map