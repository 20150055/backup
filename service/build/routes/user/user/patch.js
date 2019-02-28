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
const checkAuth_1 = require("../../checkAuth");
exports.router = express.Router();
exports.router.patch("/:userId", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const oldUser = yield sqliteConnection_1.database.loadUserById(request.params.userId);
        let errormessages = yield functions_1.checkError(body, request.params.userId, true);
        if (errormessages.length === 0) {
            let newUser = functions_1.setValues(body);
            if (!newUser.firstName) {
                newUser.firstName = oldUser.firstName;
            }
            if (!newUser.lastName) {
                newUser.lastName = oldUser.lastName;
            }
            if (!newUser.email) {
                newUser.email = oldUser.email;
            }
            if (!newUser.username) {
                newUser.username = oldUser.username;
            }
            newUser.id = oldUser.id;
            newUser.job = oldUser.job;
            newUser.repo = oldUser.repo;
            newUser.token = oldUser.token; // TODO: Sicher?
            if (!newUser.password) {
                newUser.password = oldUser.password;
                newUser = yield sqliteConnection_1.database.patchUser(newUser);
            }
            else {
                newUser = yield sqliteConnection_1.database.createUser(newUser);
            }
            const responseObject = newUser;
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    { name: "api.success.user.patch", type: types_1.MessageType.success }
                ],
                payload: { user: responseObject }
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
//# sourceMappingURL=patch.js.map