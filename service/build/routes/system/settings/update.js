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
const functions_1 = require("./functions");
exports.router = express.Router();
exports.router.put("/:userId/globalsettings/:settingsId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errormessages = yield functions_1.checkError(body);
        if (errormessages.length === 0) {
            const oldSettings = yield sqliteConnection_1.database.loadGlobalSettingsById(request.params.settingsId);
            let newSettings = functions_1.setValues(body);
            newSettings.id = oldSettings.id;
            yield sqliteConnection_1.database.createGlobalSettings(newSettings);
            let responseObject = newSettings;
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    { name: "api.success.usersettings.create", type: types_1.MessageType.success }
                ],
                payload: { settings: responseObject }
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=update.js.map