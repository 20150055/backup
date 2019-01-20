"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const systemRoute = require("./system");
const userRoute = require("./user");
exports.router = express.Router();
exports.router.use("/api", systemRoute.router);
exports.router.use("/api", userRoute.router);
//# sourceMappingURL=index.js.map