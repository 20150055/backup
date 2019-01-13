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
const LocalAmazonS3BackupRepository_1 = require("./entity/LocalAmazonS3BackupRepository");
const UserSettings_1 = require("./entity/UserSettings");
const GlobalSettings_1 = require("./entity/GlobalSettings");
const Log_1 = require("./entity/Log");
class Database {
    constructor(conn) { this.connection = conn; }
    createLocalBackupRepository(repoType, repoName, repoPassword, autoUnlock, repoLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new LocalAmazonS3BackupRepository_1.LocalAmazonS3BackupRepository();
            repository.repoType = repoType;
            repository.repoName = repoName;
            repository.repoPassword = this.hash(repoPassword);
            repository.autoUnlock = autoUnlock;
            repository.repoLocation = repoLocation;
            yield this.connection.manager.save(repository);
        });
    }
    createAmazonS3BackupRepository(repoType, repoName, repoPassword, autoUnlock, repoLocation, accessKey, secretAccessKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new LocalAmazonS3BackupRepository_1.LocalAmazonS3BackupRepository();
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
            backupJob.repo = repoId;
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
    createUserSetting(userId, enableRegister, automaticUpdates, updateCheckInterval, sendEmails, reportLanguage, smtpHostname, smtpPort, smtpUsername, smtpPassword, smtpFrom, smtpTo, language, showSnackbar, themePrimary, themeSecondary, themeAccent, darktheme) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSettings = new UserSettings_1.UserSettings();
            userSettings.user = userId;
            userSettings.enableRegister = enableRegister;
            userSettings.automaticUpdates = automaticUpdates;
            userSettings.updateCheckInterval = updateCheckInterval;
            userSettings.sendEmails = sendEmails;
            userSettings.reportLanguage = reportLanguage;
            userSettings.smtpHostname = smtpHostname;
            userSettings.smtpPort = smtpPort;
            userSettings.smtpUsername = smtpUsername;
            userSettings.smtpPassword = smtpPassword;
            userSettings.smtpFrom = smtpFrom;
            userSettings.smtpTo = smtpTo;
            userSettings.language = language;
            userSettings.showSnackbar = showSnackbar;
            userSettings.themePrimary = themePrimary;
            userSettings.themeSecondary = themeSecondary;
            userSettings.themeAccent = themeAccent;
            userSettings.darktheme = darktheme;
            yield this.connection.manager.save(userSettings);
        });
    }
    createGlobalSettings(port) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalSettings = new GlobalSettings_1.GlobalSettings();
            globalSettings.port = port;
            yield this.connection.manager.save(globalSettings);
        });
    }
    createLog(status, start, end, output, backupjobID, repositoryID) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = new Log_1.Log();
            log.status = status;
            log.start = start;
            log.end = end;
            log.output = output;
            log.backupjob = backupjobID;
            log.repository = repositoryID;
            yield this.connection.manager.save(log);
        });
    }
    loadUserByUsername(searchUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager.getRepository(User_1.User).findOne({ username: searchUsername });
            return user;
        });
    }
    loadUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager.getRepository(User_1.User).findOne({ email: email });
            return user;
        });
    }
    loadUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager.getRepository(User_1.User).findOne({ id: id });
            return user;
        });
    }
    loadBackupJobByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.connection.manager.getRepository(BackupJob_1.BackupJob).findOne({ name: name });
            return job;
        });
    }
    loadUserSettingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersetting = yield this.connection.manager.getRepository(UserSettings_1.UserSettings).findOne({ user: userId });
            return usersetting;
        });
    }
    loadBackupRepository(repoSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof repoSearch === "string") {
                return yield this.connection.manager.getRepository(LocalAmazonS3BackupRepository_1.LocalAmazonS3BackupRepository).findOne({ repoName: repoSearch });
            }
            if (typeof repoSearch === "number") {
                return yield this.connection.manager.getRepository(LocalAmazonS3BackupRepository_1.LocalAmazonS3BackupRepository).findOne({ id: repoSearch });
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