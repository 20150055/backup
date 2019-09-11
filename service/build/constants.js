"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const os = require("os");
const fsextra = require("fs-extra");
const retValForDevelopment = false;
const authForDevelopment = true; // Authentication
function getDummyInstall() {
    return retValForDevelopment;
}
exports.getDummyInstall = getDummyInstall;
function getDevelopment() {
    return retValForDevelopment;
}
exports.getDevelopment = getDevelopment;
exports.fallbackResticVersion = "0.9.5"; // in case the github rate limit is exceeded, doubles as minimum version (new version is automatically downloaded)
var Env;
(function (Env) {
    Env[Env["dev"] = 0] = "dev";
    Env[Env["prod"] = 1] = "prod";
    Env[Env["test"] = 2] = "test";
})(Env = exports.Env || (exports.Env = {}));
var OsType;
(function (OsType) {
    OsType[OsType["windows"] = 0] = "windows";
    OsType[OsType["linux"] = 1] = "linux";
    OsType[OsType["darwin"] = 2] = "darwin";
})(OsType = exports.OsType || (exports.OsType = {}));
exports.currentOs = (os => os === "win32"
    ? OsType.windows
    : os === "darwin"
        ? OsType.darwin
        : OsType.linux)(process.platform);
exports.curEnv = process.env.NODE_ENV === "test"
    ? Env.test
    : process.env.NODE_ENV === "development"
        ? Env.dev
        : Env.prod;
exports.pathToRepoDb = exports.curEnv === Env.test ? os.tmpdir() + "/Backu380.db" : "../data/Backup380.db";
exports.resticPath = path.resolve(getResticFolder(), `restic${exports.currentOs === OsType.windows ? ".exe" : ""}`);
function getServerLogfilePath() {
    let dir = path.join(getLogFolder(), "server");
    if (!fsextra.existsSync(dir))
        fsextra.mkdirSync(dir);
    dir = path.join(dir, "log.txt");
    if (!fsextra.existsSync(dir))
        fsextra.createFileSync(dir);
    return dir;
}
exports.getServerLogfilePath = getServerLogfilePath;
/**
 * Resolves path to absolute folder relative to the res folder
 * @param relPath
 */
exports.resolveRes = relPath => path.resolve(__dirname, "res", relPath);
function getAuth() {
    return authForDevelopment;
}
exports.getAuth = getAuth;
function getProjectDataPath() {
    let dir;
    if (exports.curEnv === Env.dev) {
        dir = path.join(path.dirname(path.dirname(__dirname)), "Data");
    }
    else {
        switch (exports.currentOs) {
            case OsType.windows:
                dir = "C:/ProgramData/Backup380";
                if (!fsextra.existsSync(dir))
                    fsextra.mkdirSync(dir);
                break;
            case OsType.linux:
                dir = path.join("/etc", "Backup380");
                break;
            case OsType.darwin:
                dir = path.join(path.join(path.join(os.homedir(), "Library"), "Application Support"), "Backup380");
                break;
        }
        if (!fsextra.existsSync(dir))
            fsextra.mkdirSync(dir);
        dir = path.join(dir, "Data");
    }
    if (!fsextra.existsSync(dir))
        fsextra.mkdirSync(dir);
    return dir;
}
exports.getProjectDataPath = getProjectDataPath;
function getResticFolder() {
    const dir = path.join(getProjectDataPath(), "restic");
    if (!fsextra.existsSync(dir))
        fsextra.mkdirSync(dir);
    return dir;
}
exports.getResticFolder = getResticFolder;
function getDataFolder() {
    const dir = path.join(getProjectDataPath(), "data");
    if (!fsextra.existsSync(dir))
        fsextra.mkdirSync(dir);
    return dir;
}
exports.getDataFolder = getDataFolder;
function getLogFolder() {
    const dir = path.join(getDataFolder(), "logs");
    if (!fsextra.existsSync(dir))
        fsextra.mkdirSync(dir);
    return dir;
}
exports.getLogFolder = getLogFolder;
function getDatabaseFilePath() {
    return path.join(getProjectDataPath(), "Backup380.db");
}
exports.getDatabaseFilePath = getDatabaseFilePath;
function getBackup380ProjectFolder() {
    if (exports.curEnv === Env.dev) {
        return path.dirname(path.dirname(__dirname));
    }
    else {
        return __dirname;
    }
}
exports.getBackup380ProjectFolder = getBackup380ProjectFolder;
//# sourceMappingURL=constants.js.map