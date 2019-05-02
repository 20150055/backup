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
const axios_1 = require("axios");
const path = require("path");
const parser = require("cron-parser");
const fs = require("fs");
const fs_extra_1 = require("fs-extra");
const sqliteConnection_1 = require("../sqliteConnection");
const app_1 = require("../app");
const types_1 = require("../shared/types");
const execUpdate_1 = require("./execUpdate");
const logging_1 = require("../logging");
function checkForUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        const globalSettings = yield sqliteConnection_1.database.loadGlobalSettingsById(1);
        if (globalSettings) {
            let interval;
            switch (globalSettings.updateCheckInterval) {
                case types_1.UpdateCheckInterval.hourly:
                    interval = "0 0 * ? * *";
                    break; // Every hour
                case types_1.UpdateCheckInterval.daily:
                    interval = "0 0 0 * * ?";
                    break; // Every day at midnight - 12am
                case types_1.UpdateCheckInterval.weekly:
                    interval = "0 0 0 */7 * ?";
                    break; // Every 7 days at midnight
                default:
                    // Logging
                    let logInfo = {
                        logLevel: types_1.LogLevel.error,
                        eventDescription: "api.error.update.invalid-updateCheckInterval",
                        message: `ERROR: invalid interval -> \"${globalSettings.updateCheckInterval}\"`,
                        type: types_1.LogType.other
                    };
                    logging_1.createLog(logInfo);
                    return;
            }
            const prevCheck = parser
                .parseExpression(interval)
                .prev()
                .getTime();
            const nextCheck = parser
                .parseExpression(interval)
                .next()
                .getTime();
            if (prevCheck > globalSettings.lastUpdateCheck) {
                doCheckNow(prevCheck);
            }
            else {
                setTimeout(() => doCheckNow(nextCheck), nextCheck - new Date().getTime());
            }
        }
    });
}
exports.checkForUpdate = checkForUpdate;
function doCheckNow(currentCheck) {
    return __awaiter(this, void 0, void 0, function* () {
        const globalSettings = yield sqliteConnection_1.database.loadGlobalSettingsById(1);
        if (globalSettings) {
            globalSettings.lastUpdateCheck = currentCheck;
            yield sqliteConnection_1.database.createGlobalSettings(globalSettings);
            if (!((yield versionUpToDate()) === true)) {
                if (globalSettings.automaticUpdates === true) {
                    execUpdate_1.execUpdate();
                }
                else {
                    notifyUpdateAvailable(); // TODO node-notifier
                }
                return;
            }
            checkForUpdate();
        }
    });
}
function versionUpToDate() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://raw.githubusercontent.com/20150055/backup/gh-pages/version";
        try {
            const content = yield axios_1.default.get(url);
            const currentVersion = content.data;
            let versionPath = path.resolve(__dirname, "../../../version");
            if (fs.existsSync(path.join(path.dirname(path.dirname(path.dirname(__dirname))), "version"))) {
                versionPath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "version");
            }
            const installedVersion = yield fs_extra_1.readJson(versionPath);
            if (currentVersion != installedVersion) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (error) {
            return error.toString();
        }
    });
}
exports.versionUpToDate = versionUpToDate;
function notifyUpdateAvailable() {
    app_1.io.of("/api/").emit("updateAvailable");
}
//# sourceMappingURL=checkForUpdate.js.map