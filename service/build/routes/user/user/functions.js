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
const types_1 = require("../../../shared/types");
const User_1 = require("../../../entity/User");
const sqliteConnection_1 = require("../../../sqliteConnection");
function checkError(body, userId, insert) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        try {
            if (!(body.firstName &&
                body.lastName &&
                body.username &&
                body.email &&
                body.password)) {
                if (!body.firstName) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.firstName",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.lastName) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.lastName",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.username) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.username",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.email) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.email",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.password) {
                    errormessages.push({
                        name: "api.error.user.register.missing-data.password",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.username) {
                const user = yield sqliteConnection_1.database.loadUserByUsername(body.username);
                if (user) {
                    if (user.id != userId) {
                        errormessages.push({
                            name: "api.error.user.register.username-already-exists",
                            type: types_1.MessageType.error,
                            args: { username: body.username }
                        });
                    }
                }
            }
            if (body.email) {
                body.email = body.email.toLowerCase();
                const user = yield sqliteConnection_1.database.loadUserByEmail(body.email);
                if (user) {
                    if (user.id != userId) {
                        errormessages.push({
                            name: "api.error.user.register.email-already-exists",
                            type: types_1.MessageType.error,
                            args: { email: body.email }
                        });
                    }
                }
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.user.register.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
        }
        return errormessages;
    });
}
exports.checkError = checkError;
function setValues(body) {
    let user = new User_1.User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;
    user.email = body.email;
    user.password = body.password;
    return user;
}
exports.setValues = setValues;
//# sourceMappingURL=functions.js.map