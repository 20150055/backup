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
const axios_1 = require("axios");
const path = require("path");
const types_1 = require("../../../shared/types");
const ApiResponse_1 = require("../../../ApiResponse");
const fs_extra_1 = require("fs-extra");
const os = require("os");
exports.router = express.Router();
const dummyInstall = true;
exports.router.get("/update", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // https://api.github.com/repos/20150055/backup/contents/version?ref=gh-pages
        // const version = Number(Buffer.from(content, 'base64').toString()); 
        const url = "https://raw.githubusercontent.com/20150055/backup/gh-pages/version";
        try {
            const content = yield axios_1.default.get(url);
            const currentVersion = content.data;
            const installedVersion = yield fs_extra_1.readJson(path.resolve(__dirname, "../../../../../version"));
            if (currentVersion != installedVersion) {
                //TODO Update
                /*
                Updateskript von /setup in %tmp% Ordner kopieren
                Updateskript den Pfad übergeben in den
                */
                const dirTemp = os.tmpdir();
            }
            else {
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [{
                            name: "api.info.system.update.version.up-to-date",
                            type: types_1.MessageType.info
                        }]
                });
            }
        }
        catch (error) {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [{
                        name: "api.error.system.update.version.other",
                        type: types_1.MessageType.error,
                        args: { error: error.toString() }
                    }]
            });
        }
        // sendResponse(response, 200, {
        //   messages: [
        //     { name: "api.success.system.check.version", type: MessageType.success },
        //   ]
        // });
    });
});
//# sourceMappingURL=get.js.map