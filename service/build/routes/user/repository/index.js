"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const create = require("./create");
const update = require("./update");
const remove = require("./delete");
const get = require("./get");
exports.router = express.Router();
exports.router.use("", create.router);
exports.router.use("", update.router);
exports.router.use("", get.router);
exports.router.use("", remove.router);
//# sourceMappingURL=index.js.map