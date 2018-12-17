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
const uuidv4 = require("uuid/v4");
const types_1 = require("./shared/types");
const sqliteConnection_1 = require("./sqliteConnection");
const ApiResponse_1 = require("./ApiResponse");
const router = express.Router();
router.post("/login", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.username && request.body.password) {
            try {
                const user = yield sqliteConnection_1.database.loadUserByUsername(request.body.username);
                if (user.password === sqliteConnection_1.database.hash(request.body.password)) {
                    ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.user.login", type: types_1.MessageType.success }], payload: { token: uuidv4() } });
                }
                else {
                    ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.login.missing-username", type: types_1.MessageType.error }] });
                }
            }
            catch (error) {
                ApiResponse_1.sendResponse(response, 404, { messages: [{ name: "api.error.user.login.user-not-found", type: types_1.MessageType.error, args: { "username": request.body.username } }] });
            }
        }
        else {
            let errormessages = [];
            if (!request.body.username) {
                errormessages.push({ name: "api.error.user.login.missing-data.username", type: types_1.MessageType.error });
            }
            if (!request.body.password) {
                errormessages.push({ name: "api.error.user.login.missing-data.password", type: types_1.MessageType.error });
            }
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password) {
            try {
                if (yield sqliteConnection_1.database.loadUserByUsername(request.body.username)) {
                    ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.register.username-already-exists", type: types_1.MessageType.error, args: { "username": request.body.username } }] });
                }
                else {
                    sqliteConnection_1.database.createUser(request.body.firstName, request.body.lastName, request.body.username, request.body.email, request.body.password);
                    ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.success.user.register", type: types_1.MessageType.success }] });
                }
            }
            catch (error) {
                let errorstring = error.toString();
                ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.register.other", type: types_1.MessageType.error, args: { "error": errorstring } }] });
            }
        }
        else {
            let errormessages = [];
            if (!request.body.firstName) {
                errormessages.push({ name: "api.error.user.register.missing-data.firstName", type: types_1.MessageType.error });
            }
            if (!request.body.lastName) {
                errormessages.push({ name: "api.error.user.register.missing-data.lastName", type: types_1.MessageType.error });
            }
            if (!request.body.username) {
                errormessages.push({ name: "api.error.user.register.missing-data.username", type: types_1.MessageType.error });
            }
            if (!request.body.email) {
                errormessages.push({ name: "api.error.user.register.missing-data.email", type: types_1.MessageType.error });
            }
            if (!request.body.password) {
                errormessages.push({ name: "api.error.user.register.missing-data.password", type: types_1.MessageType.error });
            }
            ApiResponse_1.sendResponse(response, 400, { messages: errormessages });
        }
    });
});
router.get("/anyExists", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield sqliteConnection_1.database.countUsers();
            if (count > 0) {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.true", type: types_1.MessageType.info }] });
            }
            else {
                ApiResponse_1.sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.false", type: types_1.MessageType.info }] });
            }
        }
        catch (error) {
            let errorstring = error.toString();
            ApiResponse_1.sendResponse(response, 400, { messages: [{ name: "api.error.user.anyExists.unknown", type: types_1.MessageType.error, args: { "error": errorstring } }] });
        }
    });
});
exports.default = router;
//# sourceMappingURL=apiUser.js.map