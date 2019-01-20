"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pingRoute = require("./ping");
const settingsRoute = require("./settings");
exports.router = express.Router();
exports.router.use("/system", pingRoute.router);
exports.router.use("/system", settingsRoute.router);
//# sourceMappingURL=index.js.map