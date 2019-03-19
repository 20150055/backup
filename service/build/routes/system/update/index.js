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
const update_1 = require("./../../../update");
exports.router = express.Router();
exports.router.post("/update", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield update_1.execUpdate();
        switch (res) {
            case types_1.UpdateResponse.done:
            case types_1.UpdateResponse.doneDummy:
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [{
                            name: "api.success.system.update." + res,
                            type: types_1.MessageType.success
                        }]
                });
                break;
            case types_1.UpdateResponse.downloadFailed:
            case types_1.UpdateResponse.updateFailed:
                ApiResponse_1.sendResponse(response, 400, {
                    messages: [{
                            name: "api.error.system.update." + res,
                            type: types_1.MessageType.error
                        }]
                });
                break;
            case types_1.UpdateResponse.upToDate:
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [{
                            name: "api.info.system.update." + res,
                            type: types_1.MessageType.info
                        }]
                });
                break;
            default:
                ApiResponse_1.sendResponse(response, 400, {
                    messages: [{
                            name: "api.error.system.update.other",
                            type: types_1.MessageType.info,
                            args: {
                                message: res
                            }
                        }]
                });
                break;
            // TODO default?
        }
    });
});
//# sourceMappingURL=index.js.map