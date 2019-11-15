"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const register = require("./register");
const get = require("./get");
const update = require("./update");
const patch = require("./patch");
const login = require("./login");
const anyExists = require("./anyExists");
const stats = require("./stats");
exports.router = express.Router();
exports.router.use("", anyExists.router);
exports.router.use("", register.router);
exports.router.use("", login.router);
exports.router.use("", get.router);
exports.router.use("", update.router);
exports.router.use("", patch.router);
exports.router.use("", stats.router);
//# sourceMappingURL=index.js.map