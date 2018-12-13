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
const sqliteConnection_1 = require("./sqliteConnection");
const router = express.Router();
// About page route.
router.get('/about', function (req, res) {
    res.send('About this wiki');
});
//req.get(bearer)
router.post("/login", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.username && request.body.password) {
            try {
                const user = yield sqliteConnection_1.database.loadUserByUsername(request.body.username);
                if (user.password === sqliteConnection_1.database.hash(request.body.password)) {
                    response.json({ success: { message: "api.success.user.login" },
                        token: "TOKEN-HARDCODETOKEN" }); //Token mit uuid/v5
                }
                else {
                    response.json({ error: { message: "api.error.user.login.missing-username" } });
                }
            }
            catch (error) {
                response.json({ error: { message: "api.error.user.login.user-not-found" } });
            }
        }
        else {
            response.json({ error: { message: "api.error.user.login.missing-data" } });
        }
    });
});
//response.status(201).json({ message: { name: "api.success.asdf", args: { id: 1 } }, payload: { token: "asfiunwelrifujsöfjkl" } });
router.post("/register", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password) {
            try {
                if (sqliteConnection_1.database.loadUserByEmail(request.body.email) || sqliteConnection_1.database.loadUserByUsername(request.body.username)) {
                    response.json({ success: { message: "api.error.user.register.userdata-already-exists" } });
                }
                else {
                    sqliteConnection_1.database.createUser(request.body.firstName, request.body.lastName, request.body.username, request.body.email, request.body.password);
                    response.json({ success: { message: "api.success.register" } });
                }
            }
            catch (error) {
                response.json({ error: { message: "api.error.user.register.other" } });
            }
        }
        else {
            response.json({ error: { message: "api.error.missing-data" } });
            // TODO: genauere errormessages
        }
    });
});
exports.default = router;
//# sourceMappingURL=apiUser.js.map