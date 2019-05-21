"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
// import { spawn } from "child_process";
const spawn = require("cross-spawn");
const constants_1 = require("../constants");
const log_1 = require("../util/log");
const escapeExecutablePath = (p) => p.indexOf(" ") !== -1 ? `"${p}"` : p;
function spawnRestic({ args = [], env = {} }, onProgress) {
    return new Promise(resolve => {
        log_1.log.devOnly("executing restic with following args", args);
        // see https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
        log_1.log.devOnly("spawn", {
            resticPath: constants_1.resticPath,
            args,
            cwd: path.dirname(constants_1.resticPath),
            env
        });
        const child = spawn(escapeExecutablePath(constants_1.resticPath), args.map(s => `"${s}"`), {
            cwd: path.dirname(constants_1.resticPath),
            env,
            // pipe stdin, stderr and stdout
            stdio: ["pipe", "pipe", "pipe"],
            // run the command within a shell
            shell: true,
            // hide the command prompt
            windowsHide: true
        });
        const buffer = [];
        child.on("error", err => {
            log_1.log.error(err);
        });
        child.stderr.on("data", (chunk) => {
            buffer.push(chunk.toString());
        });
        child.stdout.on("data", (chunk) => {
            const part = chunk.toString();
            buffer.push(part);
            if (onProgress) {
                onProgress(part);
            }
        });
        child.on("close", code => {
            const output = buffer.join("");
            log_1.log.devOnly({ output, code });
            if (code) {
                return resolve({
                    success: false,
                    fullOutput: output || "process failed with code " + code
                });
            }
            resolve({
                success: true,
                fullOutput: output
            });
        });
    });
}
exports.spawnRestic = spawnRestic;
//# sourceMappingURL=restic.js.map