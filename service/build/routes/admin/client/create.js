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
const Client_1 = require("../../../entity/Client");
exports.router = express.Router();
exports.router.post("/client", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errormessages = [];
        if (!body.ip) {
            errormessages.push({
                name: "api.error.admin.client.create.missing-data.ip",
                type: types_1.MessageType.error
            });
        }
        if (!body.name) {
            errormessages.push({
                name: "api.error.admin.client.create.missing-data.name",
                type: types_1.MessageType.error
            });
        }
        if (errormessages.length != 0) {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
        else {
            let client = new Client_1.Client();
            client.ip = body.ip;
            client.name = body.name;
            client.admin = 1;
            client.os = body.os;
            yield sqliteConnection_1.database.createClient(client);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.client.create",
                        type: types_1.MessageType.success
                    }
                ],
                payload: { client: client }
            });
        }
    });
});
//# sourceMappingURL=create.js.map