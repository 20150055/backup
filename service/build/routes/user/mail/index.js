"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const get = require("./checkMail");
const post = require("./sendMail");
exports.router = express.Router();
exports.router.use("", get.router);
exports.router.use("", post.router);
//# sourceMappingURL=index.js.map