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
const fs = require("fs");
const ApiResponse_1 = require("../../../ApiResponse");
const types_1 = require("../../../shared/types");
const fsextra = require("fs-extra");
exports.router = express.Router();
exports.router.get("/directory", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        let invalidValues = true;
        let availableFolders = [];
        if (typeof body.path === "boolean" && !body.path) {
            invalidValues = false;
            if (process.platform.startsWith("win")) {
                yield Promise.all(new Array(26)
                    .fill(false)
                    .map((_, index) => String.fromCharCode(index + "A".charCodeAt(0)) + ":/")
                    .map((dir) => __awaiter(this, void 0, void 0, function* () {
                    let exists = yield fsextra.pathExists(dir);
                    if (exists) {
                        availableFolders.push({ name: dir, folder: true });
                    }
                })));
            }
            else {
                // "/" for linux and mac
            }
        }
        if (typeof body.path === "string") {
            invalidValues = false;
            let path = body.path;
            fs.readdir(path, function (err, items) {
                if (items) {
                    items.forEach(function (item) {
                        try {
                            let stats = fs.statSync(path + "/" + item);
                            let isFolder = stats.isDirectory();
                            availableFolders.push({ name: item, folder: isFolder });
                        }
                        catch (error) {
                            availableFolders.push({ name: item, folder: null });
                        }
                    });
                }
            });
        }
        if (invalidValues) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [
                    {
                        name: "api.error.system.directory.invalid-values",
                        type: types_1.MessageType.error
                    }
                ]
            });
        }
        availableFolders.sort((a, b) => a.name.localeCompare(b.name));
        if (availableFolders.length > 0) {
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