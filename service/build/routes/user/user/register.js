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
const functions_1 = require("./functions");
const UserSettings_1 = require("../../../entity/UserSettings");
const uuidv4 = require("uuid/v4");
exports.router = express.Router();
exports.router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let errormessages = yield functions_1.checkError(body, null, false);
        if (errormessages.length === 0) {
            let user = functions_1.setValues(body);
            user = yield sqliteConnection_1.database.createUser(user);
            let settings = new UserSettings_1.UserSettings;
            settings.user = user.id;
            settings = yield sqliteConnection_1.database.createUserSettings(settings);
            const token = uuidv4();
            yield sqliteConnection_1.database.setUserToken(user.id, token);
            const responseObject = user;
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    { name: "api.success.user.register", type: types_1.MessageType.success }
                ],
                payload: { user: responseObject, token }
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=register.js.map