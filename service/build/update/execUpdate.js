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
const path = require("path");
const os = require("os");
const fs = require("fs");
const index_1 = require("../index");
const fs_extra_1 = require("fs-extra");
const checkForUpdate_1 = require("./checkForUpdate");
const child_process_1 = require("child_process");
const types_1 = require("../shared/types");
const constants_1 = require("../constants");
exports.router = express.Router();
const dummyInstall = constants_1.getDummyInstall();
function execUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        let upToDate = yield checkForUpdate_1.versionUpToDate(); // once again check version (not necessary)
        if (upToDate === false) {
            let dirTemp = os.tmpdir();
            let dirScript = path.resolve(__dirname, "../../../../../Setup");
            let argsDownload = ["-d"];
            let argsUpdate = ["-u"];
            if (fs.existsSync(path.join(path.dirname(path.dirname(path.dirname(__dirname))), "Setup"))) {
                dirScript = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "Setup");
            }
            if (process.platform.startsWith("win")) {
                dirScript += "\\Windows\\install.ps1";
                dirTemp += "\\install.ps1";
                let setPolicy = "Set-ExecutionPolicy Bypass -Scope Process -Force;";
                argsDownload = [
                    setPolicy,
                    dirTemp,
                    "-d",
                    "-path",
                    os.tmpdir() + "/Backup380"
                ];
                argsUpdate = [
                    setPolicy,
                    dirTemp,
                    "-u",
                    "-path",
                    os.tmpdir() + "/Backup380"
                ];
            }
            else if (process.platform.toString() === "darwin") {
                dirScript += "/Mac/install.sh";
                dirTemp += "/install.sh";
            }
            else {
                dirScript += "/Linux/install.sh";
                dirTemp += "/install.sh";
            }
            yield copyFiles(dirScript, dirTemp);
            if (!dummyInstall) {
                const resultsDownload = yield executeScript("powershell", argsDownload); // dirtemp
                // console.log(resultsDownload); // TODO LOG instead
                if (resultsDownload.status === "success") {
                    const resultsUpdate = yield executeScript("powershell", argsUpdate);
                    if (resultsUpdate.status === "success") {
                        notifyUpdateComplete();
                        return types_1.UpdateResponse.done;
                    }
                    else {
                        return types_1.UpdateResponse.updateFailed;
                    }
                }
                else {
                    return types_1.UpdateResponse.downloadFailed;
                }
            }
            else {
                notifyUpdateComplete();
                return types_1.UpdateResponse.doneDummy;
            }
        }
        else if (upToDate === true) {
            return types_1.UpdateResponse.upToDate;
        }
        else {
            return upToDate;
        }
    });
}
exports.execUpdate = execUpdate;
// see https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
function executeScript(scriptPath, args) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            console.debug("executing update with following args", args);
            const child = child_process_1.spawn(scriptPath, args, {
                cwd: path.dirname(scriptPath),
                // pipe stdin, stderr and stdout
                stdio: ["pipe", "pipe", "pipe"],
                // run the command within a shell
                shell: true,
                // hide the command prompt
                windowsHide: true
            });
            const buffer = [];
            child.stderr.on("data", (chunk) => {
                buffer.push(chunk.toString());
            });
            child.stdout.on("data", (chunk) => {
                const part = chunk.toString();
                buffer.push(part);
            });
            child.on("close", code => {
                const output = buffer.join("");
                const isSuccessful = /Operation Finished/.test(output);
                if (code || !isSuccessful) {
                    return resolve({
                        status: "error",
                        output
                    });
                }
                resolve({
                    status: "success",
                    output
                });
            });
        });
    });
}
function notifyUpdateComplete() {
    index_1.io.of("/api/").emit("updateComplete");
}
function copyFiles(src, dst) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_extra_1.copy(src, dst);
        }
        catch (err) {
            console.error(err);
        }
    });
}
//# sourceMappingURL=execUpdate.js.map