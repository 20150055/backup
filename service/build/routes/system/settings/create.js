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
const GlobalSettings_1 = require("../../../entity/GlobalSettings");
const checkAuth_1 = require("../../checkAuth");
const enumTypes = require("../../../shared/types/enumTypes");
exports.router = express.Router();
exports.router.post("/:userId/globalsettings", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errorOccured = false;
        let errormessages = [];
        try {
            if (!(body.port && body.automaticUpdates && body.enableRegister && body.updateCheckInterval)) {
                errorOccured = true;
                if (!request.body.port) {
                    errormessages.push({ name: "api.error.globalsettings.create.missing-data.port", type: types_1.MessageType.error });
                }
                if (!request.body.automaticUpdates) {
                    errormessages.push({ name: "api.error.globalsettings.create.missing-data.automaticUpdates", type: types_1.MessageType.error });
                }
                if (!request.body.enableRegister) {
                    errormessages.push({ name: "api.error.globalsettings.create.missing-data.enableRegister", type: types_1.MessageType.error });
                }
                if (!request.body.updateCheckInterval) {
                    errormessages.push({ name: "api.error.globalsettings.create.missing-data.updateCheckInterval", type: types_1.MessageType.error });
                }
            }
            if (body.updateCheckInterval) {
                if (body.updateCheckInterval != enumTypes.UpdateCheckInterval.hourly &&
                    body.updateCheckInterval != enumTypes.UpdateCheckInterval.daily &&
                    body.updateCheckInterval != enumTypes.UpdateCheckInterval.weekly) {
                    errorOccured = true;
                    errormessages.push({
                        name: "api.error.globalsettings.create.invalid-UpdateCheckInterval",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (!errorOccured) {
                let settings = new GlobalSettings_1.GlobalSettings;
                settings.port = body.port;
                settings.automaticUpdates = body.automaticUpdates;
                settings.enableRegister = body.enableRegister;
                settings.updateCheckInterval = body.updateCheckInterval;
                yield sqliteConnection_1.database.createGlobalSettings(settings);
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.globalsettings.create", type: types_1.MessageType.success }], payload: { settings: settings } });
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
//# sourceMappingURL=create.js.map