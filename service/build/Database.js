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
const crypto = require("crypto");
const User_1 = require("./entity/User");
const BackupJob_1 = require("./entity/BackupJob");
const ScheduledBackup_1 = require("./entity/ScheduledBackup");
const Local_SFTP_BackupRepository_1 = require("./entity/Local_SFTP_BackupRepository");
const S3_Amazon_BackupRepository_1 = require("./entity/S3_Amazon_BackupRepository");
class Database {
    constructor(conn) { this.connection = conn; }
    create_Local_SFTP_BackupRepository(repoType, repoName, repoPassword, autoUnlock, repoLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Local_SFTP_BackupRepository_1.Local_SFTP_BackupRepository();
            repository.repoType = repoType;
            repository.repoName = repoName;
            repository.repoPassword = this.hash(repoPassword);
            repository.autoUnlock = autoUnlock;
            repository.repoLocation = repoLocation;
            yield this.connection.manager.save(repository);
        });
    }
    create_Amazon_S3_BackupRepository(repoType, repoName, repoPassword, autoUnlock, repoLocation, accessKey, secretAccessKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new S3_Amazon_BackupRepository_1.S3_Amazon_BackupRepository();
            repository.repoType = repoType;
            repository.repoName = repoName;
            repository.repoPassword = this.hash(repoPassword);
            repository.autoUnlock = autoUnlock;
            repository.repoLocation = repoLocation;
            repository.accessKey = accessKey;
            repository.secretAccessKey = secretAccessKey;
            yield this.connection.manager.save(repository);
        });
    }
    createBackupjob(repoId, name, maxBackups, emailNotification, backupLocations) {
        return __awaiter(this, void 0, void 0, function* () {
            const backupJob = new BackupJob_1.BackupJob();
            backupJob.repoId = repoId;
            backupJob.name = name;
            backupJob.maxBackups = maxBackups;
            backupJob.emailNotification = emailNotification;
            backupJob.backupLocations = backupLocations;
            yield this.connection.manager.save(backupJob);
        });
    }
    createScheduledBackup(backupId, weeklyRepeat, starttime, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduledBackup = new ScheduledBackup_1.ScheduledBackup();
            scheduledBackup.backupId = backupId;
            scheduledBackup.weeklyRepeat = weeklyRepeat;
            scheduledBackup.starttime = starttime;
            scheduledBackup.monday = monday;
            scheduledBackup.tuesday = tuesday;
            scheduledBackup.wednesday = wednesday;
            scheduledBackup.thursday = thursday;
            scheduledBackup.friday = friday;
            scheduledBackup.saturday = saturday;
            scheduledBackup.sunday = sunday;
            yield this.connection.manager.save(scheduledBackup);
        });
    }
    createUser(firstName, lastName, username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;
            user.email = email;
            user.password = this.hash(password);
            yield this.connection.manager.save(user);
        });
    }
    loadUserByUsername(searchUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager.getRepository(User_1.User).findOne({ username: searchUsername });
            return user;
        });
    }
    loadBackupJobByRepoID(reopID) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.connection.manager.getRepository(BackupJob_1.BackupJob).findOne({ repoId: reopID });
            return job;
        });
    }
    load_S3_Amazon_BackupRepository(repoSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof repoSearch === "string") {
                return yield this.connection.manager.getRepository(S3_Amazon_BackupRepository_1.S3_Amazon_BackupRepository).findOne({ repoName: repoSearch });
            }
            if (typeof repoSearch === "number") {
                return yield this.connection.manager.getRepository(S3_Amazon_BackupRepository_1.S3_Amazon_BackupRepository).findOne({ id: repoSearch });
            }
        });
    }
    load_Local_SFTP_BackupRepository(repoSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof repoSearch === "string") {
                return yield this.connection.manager.getRepository(Local_SFTP_BackupRepository_1.Local_SFTP_BackupRepository).findOne({ repoName: repoSearch });
            }
            if (typeof repoSearch === "number") {
                return yield this.connection.manager.getRepository(Local_SFTP_BackupRepository_1.Local_SFTP_BackupRepository).findOne({ id: repoSearch });
            }
        });
    }
    backupRepositoryExists(repoSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.load_Local_SFTP_BackupRepository(repoSearch)) {
                return true;
            }
            if (yield this.load_S3_Amazon_BackupRepository(repoSearch)) {
                return true;
            }
            return false;
        });
    }
    countUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.connection.manager.getRepository(User_1.User).count();
            return count;
        });
    }
    hash(word) {
        const hash = crypto.createHmac("sha512", "").update(word).digest("hex");
        return hash;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map