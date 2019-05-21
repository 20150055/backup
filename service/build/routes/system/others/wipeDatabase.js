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
const ApiResponse_1 = require("../../../ApiResponse");
const sqliteConnection_1 = require("../../../sqliteConnection");
const types_1 = require("../../../shared/types");
const constants_1 = require("../../../constants");
exports.router = express.Router();
exports.router.post("/wipeDatabase", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (constants_1.curEnv === constants_1.Env.dev) {
            yield sqliteConnection_1.database.wipeOutDatabase();
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.system.wipe-out-database",
                        type: types_1.MessageType.success
                    }
                ]
            });
            return;
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.system.wipe-out-database.not-in-development-state",
                        type: types_1.MessageType.error
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=wipeDatabase.js.map