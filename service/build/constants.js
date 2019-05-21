"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const retValForDevelopment = false;
const authForDevelopment = false; // Authentication
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
exports.resticPath = path.resolve("path/to/restic", // TODO
`restic${exports.currentOs === OsType.windows ? ".exe" : ""}`);
exports.serverLogPath = path.resolve("path/to/server/log/file", // TODO
"log.txt");
/**
 * Resolves path to absolute folder relative to the res folder
 * @param relPath
 */
exports.resolveRes = relPath => path.resolve(__dirname, "res", relPath);
function getAuth() {
    return authForDevelopment;
}
exports.getAuth = getAuth;
//# sourceMappingURL=constants.js.map