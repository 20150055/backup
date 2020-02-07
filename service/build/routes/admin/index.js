"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const createClient = require("./client/create");
const deleteClient = require("./client/delete");
const getAllClients = require("./client/getAll");
const updateClient = require("./client/update");
const install = require("./client/install");
const deleteOnClient = require("./client/deleteOnClient");
const createRepositoryOnClient = require("./client/createRepositoryOnClient");
const createBackupJobOnClient = require("./client/createBackupjobOnClient");
const addUserToClient = require("./client/addUserToClient");
const getactiveBackupJobs = require("./client/getActiveBackupjobsOnClient");
const installstatus = require("./client/checkInstallStatus");
const login = require("./login");
const getRepos = require("./client/getAllReposOnClient");
const fetchUserFromClient = require("./client/fetchUserFromClient");
const loginAndFetchUser = require("./client/loginAndFetchUser");
const getClient = require("./client/get");
const getClientDirs = require("./client/fetchDirsFromClient");
const adminExists = require("./anyExists");
const register = require("./register");
exports.router = express.Router();
exports.router.use("/admin", createClient.router);
exports.router.use("/admin", deleteClient.router);
exports.router.use("/admin", getAllClients.router);
exports.router.use("/admin", updateClient.router);
exports.router.use("/admin", install.router);
exports.router.use("/admin", deleteOnClient.router);
exports.router.use("/admin", addUserToClient.router);
exports.router.use("/admin", createRepositoryOnClient.router);
exports.router.use("/admin", createBackupJobOnClient.router);
exports.router.use("/admin", login.router);
exports.router.use("/admin", adminExists.router);
exports.router.use("/admin", register.router);
exports.router.use("/admin", getactiveBackupJobs.router);
exports.router.use("/admin", installstatus.router);
exports.router.use("/admin", getRepos.router);
exports.router.use("/admin", fetchUserFromClient.router);
exports.router.use("/admin", loginAndFetchUser.router);
exports.router.use("/admin", getClient.router);
exports.router.use("/admin", getClientDirs.router);
//# sourceMappingURL=index.js.map