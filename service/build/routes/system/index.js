"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pingRoute = require("./others");
const settingsRoute = require("./settings");
const filesystemRoute = require("./filesystem");
const updateRoute = require("./update");
const logging = require("./logging");
exports.router = express.Router();
exports.router.use("/system", pingRoute.router);
exports.router.use("/system", settingsRoute.router);
exports.router.use("/system", filesystemRoute.router);
exports.router.use("/system", updateRoute.router);
exports.router.use("/system", logging.router);
//# sourceMappingURL=index.js.map