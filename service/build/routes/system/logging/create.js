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
const ApiResponse_1 = require("../../../ApiResponse");
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.post("/log", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const success = yield logging_1.createLog(body);
        if (success === true) {
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.system.log",
                        type: types_1.MessageType.success
                    }
                ]
            });
        }
        else {
            if (success !== false && success.length > 0) {
                ApiResponse_1.sendResponse(response, 400, {
                    messages: success
                });
            }
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.system.log.other",
                        type: types_1.MessageType.error
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=create.js.map