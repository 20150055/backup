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
exports.checkAuth = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const dev = false;
    const token = req.headers.authorization;
    const userId = req.params.userId;
    if (token && userId) {
        const user = yield sqliteConnection_1.database.loadUserById(userId);
        if (user && user.token === token) {
            return next();
        }
        else {
            if (dev) {
                return next();
            }
        }
    }
    return next(new Error("api.error.user.authorization-failed"));
}));
//# sourceMappingURL=checkAuth.js.map