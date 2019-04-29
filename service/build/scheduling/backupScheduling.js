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
const parser = require("cron-parser");
const sqliteConnection_1 = require("../sqliteConnection");
const resticCallFunctions_1 = require("./resticCallFunctions");
const types_1 = require("../shared/types");
const logging_1 = require("../logging");
const __1 = require("..");
function checkForBackups() {
    return __awaiter(this, void 0, void 0, function* () {
        const scheduledJobs = yield sqliteConnection_1.database.loadAllActiveBackupJobs();
        scheduledJobs.forEach((job) => __awaiter(this, void 0, void 0, function* () { return scheduleBackup(job.id); }));
    });
}
exports.checkForBackups = checkForBackups;
function scheduleBackup(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        const job = yield sqliteConnection_1.database.loadBackupJobById(jobId);
        // This function is also called by REST endpoints
        if (job && job.active && !job.archived) {
            const prevBackup = parser
                .parseExpression(job.cronInterval)
                .prev()
                .getTime();
            if (prevBackup > job.prevScheduledDate && prevBackup > job.startDate) {
                checkActiveState(job.id, prevBackup);
            }
            else {
                const nextBackup = parser
                    .parseExpression(job.cronInterval)
                    .next()
                    .getTime();
                const backupScheduleTime = nextBackup > job.startDate ? nextBackup : job.startDate;
                // Logging
                let logInfo = {
                    logLevel: types_1.LogLevel.info,
                    eventDescription: "api.info.backup.scheduled",
                    message: `Backup with jobId \"${job.id}\" scheduled for \"${new Date(backupScheduleTime).toDateString()}/${new Date(backupScheduleTime).toTimeString()}\"`,
                    type: types_1.LogType.backupJob,
                    jobId: job.id,
                    repoId: job.repoId
                };
                logging_1.createLog(logInfo);
                setTimeout(() => checkActiveState(job.id, backupScheduleTime), backupScheduleTime - new Date().getTime());
            }
        }
    });
}
exports.scheduleBackup = scheduleBackup;
function checkActiveState(jobId, currentBackup) {
    return __awaiter(this, void 0, void 0, function* () {
        let job = yield sqliteConnection_1.database.loadBackupJobById(jobId);
        if (job) {
            const prevBackup = parser
                .parseExpression(job.cronInterval)
                .prev()
                .getTime();
            if (job.active && !job.archived && prevBackup === currentBackup) {
                job.prevScheduledDate = currentBackup;
                yield sqliteConnection_1.database.createBackupjob(job);
                callBackupExecution(job.id, job.repoId, job.backupLocations);
                scheduleBackup(job.id);
            }
            else {
                // Logging
                let logInfo = {
                    logLevel: types_1.LogLevel.info,
                    eventDescription: "api.info.backup.cancelled",
                    message: `Backup with jobId \"${job.id}\" cancelled\nJob inactive, deleted or interval changed`,
                    type: types_1.LogType.backupJob,
                    jobId: job.id,
                    repoId: job.repoId
                };
                logging_1.createLog(logInfo);
            }
        }
    });
}
function callBackupExecution(jobId, repoId, backupLocations) {
    return __awaiter(this, void 0, void 0, function* () {
        const repository = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(repoId);
        if (repository) {
            // Logging
            let logInfo1 = {
                logLevel: types_1.LogLevel.info,
                eventDescription: "api.info.backup.execute",
                message: `Executing backup with jobId \"${jobId}\" ...`,
                type: types_1.LogType.backupJob,
                jobId: jobId,
                repoId: repoId
            };
            logging_1.createLog(logInfo1);
            let output;
            if (repository.repoType === types_1.RepoType.Local) {
                output = yield resticCallFunctions_1.executeBackup({
                    password: repository.repoPassword,
                    location: repository.repoLocation,
                    type: types_1.RepoType.Local
                }, jobId, backupLocations.split(";"));
            }
            else {
                output = yield resticCallFunctions_1.executeBackup({
                    password: repository.repoPassword,
                    location: repository.repoLocation,
                    type: types_1.RepoType.S3,
                    s3AccessKey: repository.accessKey,
                    s3SecretKey: repository.secretAccessKey
                }, jobId, backupLocations.split(";"));
            }
            // Logging
            let logInfo2 = {
                logLevel: output.success ? types_1.LogLevel.success : types_1.LogLevel.error,
                eventDescription: `api.${output.success ? types_1.LogLevel.success : types_1.LogLevel.error}.backup`,
                message: output.fullOutput,
                type: types_1.LogType.backupJob,
                jobId: jobId,
                repoId: repoId
            };
            logging_1.createLog(logInfo2);
            notifyWithSocketIo(jobId, output.success);
        }
        else {
            // Logging
            let logInfo3 = {
                logLevel: types_1.LogLevel.error,
                eventDescription: "api.error.backup.execute",
                message: `Could not find repository with ID \"${repoId}\" for executing the backup`,
                type: types_1.LogType.backupJob,
                jobId: jobId,
                repoId: repoId
            };
            logging_1.createLog(logInfo3);
            notifyWithSocketIo(jobId, false);
        }
    });
}
exports.callBackupExecution = callBackupExecution;
function notifyWithSocketIo(jobId, success) {
    __1.io.of("/api/").emit("jobExecution", { jobId: jobId, success: success });
}
//# sourceMappingURL=backupScheduling.js.map