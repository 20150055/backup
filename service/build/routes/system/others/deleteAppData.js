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
const sqliteConnection_1 = require("../../../sqliteConnection");
const constants_1 = require("../../../constants");
const fsextra = require("fs-extra");
exports.router = express.Router();
exports.router.delete("/AppData", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (curEnv != Env.dev) {
        yield sqliteConnection_1.database.wipeOutDatabase(); // TODO: uncomment when ENV variable works
        yield sqliteConnection_1.database.connection.close();
        yield fsextra.removeSync(constants_1.getProjectDataPath()); // only deletes files, no folders
        ApiResponse_1.sendResponse(response, 200, {
            messages: []
        });
        return;
        // } else {
        //   sendResponse(response, 400, {
        //     messages: []
        //   });
        // }
    });
});
//# sourceMappingURL=deleteAppData.js.map