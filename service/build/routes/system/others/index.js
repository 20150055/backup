"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ping = require("./ping");
const wipeDatabase = require("./deleteAppData");
const certificate = require("./sendCertificate");
exports.router = express.Router();
exports.router.use("", ping.router);
exports.router.use("", wipeDatabase.router);
exports.router.use("", certificate.router);
//# sourceMappingURL=index.js.map