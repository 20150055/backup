"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
const resticPath = path.join(__dirname, "../restic.exe");
function spawnRestic({ args = [], env = {} }, onProgress) {
    return new Promise(resolve => {
        console.debug("executing restic with following args", args);
        // see https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
        const child = child_process_1.spawn(resticPath, args, {
            cwd: path.dirname(resticPath),
            env,
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
            if (onProgress) {
                onProgress(part);
            }
        });
        child.on("close", code => {
            const output = buffer.join("");
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