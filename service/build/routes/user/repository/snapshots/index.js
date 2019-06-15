"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const listSnapshots_1 = require("./listSnapshots");
const restoreSnapshot_1 = require("./restoreSnapshot");
const snapShotDetails_1 = require("./snapShotDetails");
exports.router = express.Router();
exports.router.use("", listSnapshots_1.router, restoreSnapshot_1.router, snapShotDetails_1.router);
//# sourceMappingURL=index.js.map