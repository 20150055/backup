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
const restic_1 = require("./restic");
const helpers_1 = require("./helpers");
function getResticVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield restic_1.spawnRestic({
            args: ["version"],
            env: {}
        });
        if (result.success) {
            return Object.assign({}, result, { version: (result.fullOutput.match(/restic\s+([\d\.]+)\s/i) || [])[1] });
        }
        return result;
    });
}
exports.getResticVersion = getResticVersion;
function createRepository(commonArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["init", "--verbose"],
            env: environmentVariables
        });
        return result;
    });
}
exports.createRepository = createRepository;
function executeBackup(commonArgs, backupJobId, paths, onProgress) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        let highestPercentage = 0;
        if (onProgress) {
            onProgress(); // ensure onProgress is called at least once
        }
        const result = yield restic_1.spawnRestic({
            args: ["backup", ...paths, "--verbose", "--tag", `b380job${backupJobId}`],
            env: environmentVariables
        }, output => {
            if (onProgress) {
                const regex = /\[\d+:\d+\]\s*((\d+\.\d+)%)?\s*(\d+)\s*files\s*/g;
                let match = null;
                while ((match = regex.exec(output))) {
                    // either undefined or a number between 0 and 1
                    const percentage = match[2]
                        ? Number(match[2]) / 100
                        : undefined;
                    if (percentage && percentage > highestPercentage) {
                        highestPercentage = percentage;
                    }
                    const numberOfFilesProcessed = Number(match[3]);
                    onProgress({
                        processedFiles: numberOfFilesProcessed,
                        donePercentage: highestPercentage
                    });
                }
            }
        });
        return result;
    });
}
exports.executeBackup = executeBackup;
function listSnapshots(commonArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["snapshots", "--verbose", "--json"],
            env: environmentVariables
        });
        if (result.success) {
            try {
                return Object.assign({}, result, { snapshots: (JSON.parse(result.fullOutput) || []) });
            }
            catch (err) {
                return Object.assign({}, result, { snapshots: [] });
            }
        }
        return result;
    });
}
exports.listSnapshots = listSnapshots;
/**
 * This function doesn't have a progress since restic doesn't output progress information
 * @param commonArgs
 * @param restoreArgs
 */
function restoreSnapshot(commonArgs, restoreArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: [
                "restore",
                restoreArgs.snapshotId,
                "--verbose",
                "--target",
                restoreArgs.restorePath,
                ...restoreArgs.selectedPaths
                    .map(p => ["--include", p])
                    .reduce((prev, cur) => [...prev, ...cur], [])
            ],
            env: environmentVariables
        });
        return result;
    });
}
exports.restoreSnapshot = restoreSnapshot;
function listFiles(commonArgs, snapshotId) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["ls", snapshotId],
            env: environmentVariables
        });
        if (result.success) {
            const files = result.fullOutput
                .split("\n")
                .map(s => ({
                path: s
            }));
            // first line is `snapshot 9ef13ab0 of [...`
            if (files[0] && /snapshot.*of/i.test(files[0].path)) {
                files.shift();
            }
            if (files[files.length - 1] && !files[files.length - 1].path.length) {
                files.pop();
            }
            return Object.assign({}, result, { // TODO
                files });
        }
        return result;
    });
}
exports.listFiles = listFiles;
function checkRepo(commonArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["check"],
            env: environmentVariables
        });
        if (result.success) {
            return Object.assign({}, result);
        }
        return result;
    });
}
exports.checkRepo = checkRepo;
function unlockRepo(commonArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["unlock", "--remove-all"],
            env: environmentVariables
        });
        if (result.success) {
            return Object.assign({}, result);
        }
        return result;
    });
}
exports.unlockRepo = unlockRepo;
function pruneRepo(commonArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["prune"],
            env: environmentVariables
        });
        if (result.success) {
            return Object.assign({}, result);
        }
        return result;
    });
}
exports.pruneRepo = pruneRepo;
function rebuildRepoIndex(commonArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        const result = yield restic_1.spawnRestic({
            args: ["rebuild-index"],
            env: environmentVariables
        });
        if (result.success) {
            return Object.assign({}, result);
        }
        return result;
    });
}
exports.rebuildRepoIndex = rebuildRepoIndex;
//# sourceMappingURL=resticCallFunctions.js.map