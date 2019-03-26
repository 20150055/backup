"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const create = require("./create");
const update = require("./update");
const remove = require("./delete");
const get = require("./get");
const getAll = require("./getAll");
const execute = require("./execute");
exports.router = express.Router();
exports.router.use("", create.router);
exports.router.use("", update.router);
exports.router.use("", get.router);
exports.router.use("", getAll.router);
exports.router.use("", remove.router);
exports.router.use("", execute.router);
//# sourceMappingURL=index.js.map