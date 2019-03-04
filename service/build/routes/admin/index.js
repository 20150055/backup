"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const createClient = require("./client/create");
const deleteClient = require("./client/delete");
const getAllClients = require("./client/getAll");
const updateClient = require("./client/update");
const install = require("./client/install");
const deleteOnClient = require("./client/deleteOnClient");
exports.router = express.Router();
exports.router.use("/admin", createClient.router);
exports.router.use("/admin", deleteClient.router);
exports.router.use("/admin", getAllClients.router);
exports.router.use("/admin", updateClient.router);
exports.router.use("/admin", install.router);
exports.router.use("/admin", deleteOnClient.router);
//# sourceMappingURL=index.js.map