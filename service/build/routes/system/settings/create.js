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
const logging_1 = require("../../../logging");
exports.router = express.Router();
exports.router.post("/:userId/globalsettings", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errormessages = yield functions_1.checkError(body);
        if (errormessages.length === 0) {
            let settings = functions_1.setValues(body);
            settings = yield sqliteConnection_1.database.createGlobalSettings(settings);
            let responseObject = settings;
            const logValues = { status: types_1.MessageType.success, eventDescription: "api.success.globalsettings.create" };
            logging_1.createLog(logValues);
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    { name: "api.success.globalsettings.create", type: types_1.MessageType.success }
                ],
                payload: { settings: responseObject }
            });
        }
        else {
            const logValues = { status: types_1.MessageType.success, eventDescription: "api.error.globalsettings.create",
                message: "The following errors occured:\n" + errormessages.toLocaleString() };
            logging_1.createLog(logValues);
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=create.js.map