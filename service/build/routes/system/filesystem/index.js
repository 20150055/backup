"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ApiResponse_1 = require("../../../ApiResponse");
const types_1 = require("../../../shared/types");
const fsextra = require("fs-extra");
const pathModule = require("path");
exports.router = express.Router();
exports.router.get("/directory", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            path: typeof request.query.path !== "string" || request.query.path === "false"
                ? false
                : request.query.path
        };
        let invalidValue = true;
        let availableFolders = [];
        let path = typeof body.path === "string" ? body.path : false;
        if (typeof body.path === "boolean" && !body.path) {
            invalidValue = false;
            if (process.platform.startsWith("win")) {
                yield Promise.all(new Array(26)
                    .fill(false)
                    .map((_, index) => String.fromCharCode(index + "A".charCodeAt(0)) + ":/")
                    .map((dir) => __awaiter(this, void 0, void 0, function* () {
                    let exists = yield fsextra.pathExists(dir);
                    if (exists) {
                        availableFolders.push({
                            name: dir,
                            folder: true,
                            writable: true,
                            fullPath: dir
                        });
                    }
                })));
            }
            else {
                // "/" for linux and mac
                path = "/";
            }
        }
        if (path) {
            invalidValue = false;
            const items = yield fsextra.readdir(path);
            if (items) {
                yield Promise.all(items.map((item) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const stats = yield fsextra.stat(path + "/" + item);
                        const isFolder = stats.isDirectory();
                        availableFolders.push({
                            name: item,
                            folder: isFolder,
                            writable: true /* TODO */,
                            fullPath: pathModule.posix.normalize(`${path}/${item}`)
                        });
                    }
                    catch (error) {
                        availableFolders.push({
                            name: item,
                            folder: null,
                            writable: false,
                            fullPath: pathModule.posix.normalize(`${path}/${item}`)
                        });
                    }
                })));
            }
        }
        if (invalidValue) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.system.directory.invalid-values",
                        type: types_1.MessageType.error
                    }
                ]
            });
            return;
        }
        // order them a-z if they're both folders or files
        availableFolders.sort((a, b) => a.folder === b.folder ? a.name.localeCompare(b.name) : a.folder ? -1 : 1);
        if (availableFolders.length > 0) {
            availableFolders.sort((a, b) => a.name.localeCompare(b.name));
            ApiResponse_1.sendResponse(response, 200, {
                messages: [
                    {
                        name: "api.success.system.directory",
                        type: types_1.MessageType.success
                    }
                ],
                payload: { folder: availableFolders }
            });
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.system.directory.not-found",
                        type: types_1.MessageType.error
                    }
                ]
            });
        }
    });
});
//# sourceMappingURL=index.js.map