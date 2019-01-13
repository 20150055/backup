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
const types_1 = require("./shared/types");
const sqliteConnection_1 = require("./sqliteConnection");
const ApiResponse_1 = require("./ApiResponse");
const router = express.Router();
router.get("/ping", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.system.ping", type: types_1.MessageType.info }] });
    });
});
router.post("/globalsettings", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let error = false;
        let errormessages = [];
        try {
            if (!(request.body.port)) {
                error = true;
                if (!request.body.port) {
                    errormessages.push({ name: "api.error.globalsettings.create.missing-data.port", type: types_1.MessageType.error });
                }
            }
            if (!error) {
                sqliteConnection_1.database.createGlobalSettings(request.body.port);
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.globalsettings.create", type: types_1.MessageType.success }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({ name: "api.error.globalsettings.create.other", type: types_1.MessageType.error, args: { "error": errorstring } });
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
exports.default = router;
//# sourceMappingURL=apiSystem.js.map