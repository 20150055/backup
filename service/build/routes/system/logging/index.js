"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const create = require("./create");
const get = require("./get");
exports.router = express.Router();
exports.router.use("", create.router);
exports.router.use("", get.router);
//# sourceMappingURL=index.js.map