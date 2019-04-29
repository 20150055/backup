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
const sqliteConnection_1 = require("../sqliteConnection");
const constants_1 = require("../constants");
const types_1 = require("../shared/types");
const logging_1 = require("../logging");
exports.checkAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const dev = constants_1.getAuth();
    const token = req.headers.authorization.replace("Bearer ", "");
    const userId = req.params.userId;
    if (token && userId) {
        const user = yield sqliteConnection_1.database.loadUserById(userId);
        if (user && user.token && user.token != "" && user.token === token) {
            return next();
        }
        else {
            if (dev) {
                return next();
            }
        }
    }
    let logInfo = {
        userId: req.params.userId,
        logLevel: types_1.LogLevel.error,
        eventDescription: "api.error.user.authorization-failed",
        type: types_1.LogType.other
    };
    logging_1.createLog(logInfo);
    return next(new Error(logInfo.eventDescription));
});
//# sourceMappingURL=checkAuth.js.map