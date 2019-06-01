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
const app_1 = require("../../../app");
const path = require("path");
const types_1 = require("../../../shared/types");
const log_1 = require("../../../util/log");
exports.router = express.Router();
exports.router.delete("/AppData", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (constants_1.curEnv === constants_1.Env.dev || constants_1.curEnv === constants_1.Env.test) {
            yield sqliteConnection_1.database.connection.close();
            log_1.log.info("close database instance");
            // only deletes files, no folders
            yield fsextra.removeSync(constants_1.getDatabaseFilePath());
            log_1.log.info("delete database");
            yield fsextra.removeSync(path.join(constants_1.getLogFolder(), types_1.LogType.backupJob));
            yield fsextra.removeSync(path.join(constants_1.getLogFolder(), types_1.LogType.repository));
            yield fsextra.removeSync(path.join(constants_1.getLogFolder(), types_1.LogType.client));
            yield fsextra.removeSync(path.join(constants_1.getLogFolder(), types_1.LogType.other));
            log_1.log.info("delete database-logfiles");
            yield app_1.bootstrap();
            log_1.log.info("create new database instance");
            ApiResponse_1.sendResponse(response, 200, {
                messages: []
            });
            return;
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: []
            });
        }
    });
});
//# sourceMappingURL=deleteAppData.js.map