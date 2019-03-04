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
exports.router.delete("/client/:clientId", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        if (!request.params.clientId) {
            errormessages.push({
                name: "api.error.admin.client.delete.missing-data.clientId",
                type: types_1.MessageType.error
            });
        }
        if (errormessages.length != 0) {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
        else {
            let client = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
            yield sqliteConnection_1.database.deleteClientById(request.params.clientId);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.client.delete",
                        type: types_1.MessageType.success
                    }
                ],
                payload: { client: client }
            });
        }
    });
});
//# sourceMappingURL=delete.js.map