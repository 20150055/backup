"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cp = require("child_process");
const resticPath = path.join(__dirname, "../restic.exe");
//console.log(resticPath);
function executeRestic(args, env) {
    return spawn(resticPath, args, path.dirname(resticPath));
}
function spawn(exe, args, cwd) {
    return new Promise((resolve, reject) => {
        const child = cp.spawn(exe, args, { cwd: cwd || process.cwd() });
        const buffer = [];
        child.stderr.on('data', chunk => {
            buffer.push(chunk.toString());
        });
        child.stdout.on('data', chunk => {
            buffer.push(chunk.toString());
        });
        child.on('close', code => {
            const output = buffer.join('');
            if (code) {
                const msg = output || 'Process failed: ' + code;
                reject(new Error(msg));
            }
            else {
                resolve(output);
            }
        });
    });
}
//create a lokal repository
function repository_lokal(password) {
    executeRestic(["init"], { some_env_var: "someValue" }).then(console.log).catch(console.log);
    return spawn(`restic init --repo /srv/restic-repo  ${password} ${password}`, ["init"], path.dirname(resticPath));
}
function repository_sftp(password) {
    executeRestic(["init"], { some_env_var: "someValue" }).then(console.log).catch(console.log);
    return spawn(`restic -r sftp:user@host:/srv/restic-repo init ${password} ${password}`, ["init"], path.dirname(resticPath));
}
//create a s3 repository 
function repository_s3(password, bucket_name) {
    bucket_name = "https://hub.docker.com/r/minio/minio/";
    executeRestic(["init"], { some_env_var: "someValue" }).then(console.log).catch(console.log);
    return spawn(`restic -r s3:s3.amazonaws.com/${bucket_name} init ${password} ${password}`, ["init"], path.dirname(resticPath));
}
//# sourceMappingURL=executeRestic.js.map