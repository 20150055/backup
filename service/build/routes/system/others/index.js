"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ping = require("./ping");
const wipeDatabase = require("./wipeDatabase");
exports.router = express.Router();
exports.router.use("", ping.router);
exports.router.use("", wipeDatabase.router);
//# sourceMappingURL=index.js.map