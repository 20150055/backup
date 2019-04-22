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
function executeBackup(commonArgs, backupJobId, paths, // TODO: Deleted type path
onProgress) {
    return __awaiter(this, void 0, void 0, function* () {
        const environmentVariables = helpers_1.createEnv(commonArgs);
        let highestPercentage = 0;
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
//# sourceMappingURL=resticCallFunctions.js.map