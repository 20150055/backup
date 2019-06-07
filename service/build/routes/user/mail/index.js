"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const get = require("./checkMail");
exports.router = express.Router();
exports.router.use("", get.router);
//# sourceMappingURL=index.js.map