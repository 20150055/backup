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
const types_1 = require("../../shared/types");
const sqliteConnection_1 = require("../../sqliteConnection");
const ApiResponse_1 = require("../../ApiResponse");
exports.router = express.Router();
exports.router.get("/anyExists", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exists = yield sqliteConnection_1.database.checkIfAdminExists();
            if (exists) {
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.info.admin.anyExists.true", type: types_1.MessageType.info }
                    ],
                    payload: { value: true }
                });
            }
            else {
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        { name: "api.info.admin.anyExists.false", type: types_1.MessageType.info }
                    ],
                    payload: { value: false }
                });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.admin.anyExists.unknown",
                        type: types_1.MessageType.error,
                        args: { error: errorstring }
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=anyExists.js.map