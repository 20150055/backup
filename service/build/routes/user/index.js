"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const job = require("./job");
const repository = require("./repository");
const settings = require("./settings");
const user = require("./user");
exports.router = express.Router();
exports.router.use("/user", job.router);
exports.router.use("/user", repository.router);
exports.router.use("/user", settings.router);
exports.router.use("/user", user.router);
//# sourceMappingURL=index.js.map