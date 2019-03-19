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
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const BackupJob_1 = require("../../../entity/BackupJob");
const enumTypes_1 = require("../../../shared/types/enumTypes");
function checkError(body, userId, jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        try {
            if (!(body.repoId &&
                body.name &&
                body.maxBackups &&
                body.emailNotification &&
                body.backupLocations &&
                body.active != undefined &&
                body.active != null &&
                body.cronInterval &&
                body.startDate)) {
                if (!body.repoId) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.repoId",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.name) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.name",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.maxBackups) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.maxBackups",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.emailNotification) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.emailNotification",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.backupLocations) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.backupLocations",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.active) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.active",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.cronInterval) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.cronInterval",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.startDate) {
                    errormessages.push({
                        name: "api.error.backupjob.create.missing-data.startDate",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.name) {
                let job = yield sqliteConnection_1.database.loadBackupJobByName(body.name);
                if (job) {
                    if (job.id != jobId) {
                        errormessages.push({
                            name: "api.error.backupjob.create.job-already-existing",
                            type: types_1.MessageType.error
                        });
                    }
                }
            }
            if (body.repoId) {
                if (!(yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(body.repoId))) {
                    errormessages.push({
                        name: "api.error.backupjob.create.repository-not-existing",
                        type: types_1.MessageType.error,
                        args: { repoId: body.repoId.toString() }
                    });
                }
            }
            if (body.emailNotification) {
                if (body.emailNotification != enumTypes_1.EmailNotification.always &&
                    body.emailNotification != enumTypes_1.EmailNotification.never &&
                    body.emailNotification != enumTypes_1.EmailNotification.onerror) {
                    errormessages.push({
                        name: "api.error.backupjob.create.invalid-emailNotification",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.cronInterval) {
                try {
                    let interval = parser.parseExpression(body.cronInterval);
                    new Date(Date.parse(interval.next().toString()));
                }
                catch (error) {
                    let errorstring = error.toString();
                    errormessages.push({
                        name: "api.error.backupjob.create.invalid-scheduling-expression",
                        type: types_1.MessageType.error,
                        args: { error: errorstring }
                    });
                }
            }
            if (userId) {
                if (!(yield sqliteConnection_1.database.loadUserById(userId))) {
                    errormessages.push({
                        name: "api.error.backupjob.create.user-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            else {
                errormessages.push({
                    name: "api.error.backupjob.create.no-user-specified",
                    type: types_1.MessageType.error
                });
            }
            if (userId) {
                if (!(yield sqliteConnection_1.database.loadUserById(userId))) {
                    errormessages.push({
                        name: "api.error.backupjob.create.user-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (jobId) {
                if (!(yield sqliteConnection_1.database.loadBackupJobById(jobId))) {
                    errormessages.push({
                        name: "api.error.backupjob.create.job-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.backupjob.create.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
        }
        return errormessages;
    });
}
exports.checkError = checkError;
function setValues(body, userId) {
    let job = new BackupJob_1.BackupJob();
    job.user = userId;
    job.repoId = body.repoId;
    job.name = body.name;
    job.maxBackups = body.maxBackups;
    job.emailNotification = body.emailNotification;
    job.backupLocations = body.backupLocations;
    job.cronInterval = body.cronInterval;
    job.prevScheduledDate = parser.parseExpression(body.cronInterval).prev().getTime() + (body.startDate - new Date().getTime());
    job.startDate = body.startDate;
    job.active = body.active;
    return job;
}
exports.setValues = setValues;
//# sourceMappingURL=functions.js.map