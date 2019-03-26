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
const checkAuth_1 = require("../../checkAuth");
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.get("/:userId/globalsettings/:settingsId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseObject = yield sqliteConnection_1.database.loadGlobalSettingsById(request.params.settingsId);
        if (responseObject) {
            const logValues = { status: types_1.MessageType.success, eventDescription: "api.success.globalsettings.get" };
            logging_1.createLog(logValues);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    { name: "api.success.globalsettings.get", type: types_1.MessageType.success }
                ],
                payload: { settings: responseObject }
            });
        }
        else {
            const logValues = { status: types_1.MessageType.error, eventDescription: "api.error.globalsettings.get.not-existing" };
            logging_1.createLog(logValues);
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    { name: "api.error.globalsettings.get.not-existing", type: types_1.MessageType.error }
                ]
            });
        }
    });
});
//# sourceMappingURL=get.js.map