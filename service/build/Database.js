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
const LocalS3BackupRepository_1 = require("./entity/LocalS3BackupRepository");
const UserSettings_1 = require("./entity/UserSettings");
const GlobalSettings_1 = require("./entity/GlobalSettings");
const enumTypes_1 = require("./shared/types/enumTypes");
class Database {
    constructor(conn) { this.connection = conn; }
    // Create
    createLocalBackupRepository(repository) {
        return __awaiter(this, void 0, void 0, function* () {
            repository.repoPassword = this.hash(repository.repoPassword);
            yield this.connection.manager.save(repository);
        });
    }
    createS3BackupRepository(repository) {
        return __awaiter(this, void 0, void 0, function* () {
            repository.repoPassword = this.hash(repository.repoPassword);
            yield this.connection.manager.save(repository);
        });
    }
    createBackupjob(backupJob) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.save(backupJob);
        });
    }
    createScheduledBackup(scheduledBackup) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.save(scheduledBackup);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = this.hash(user.password);
            user = yield this.connection.manager.save(user);
            return user;
        });
    }
    setUserToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager.getRepository(User_1.User).findOne({ id: userId });
            user.token = token;
            yield this.connection.manager.save(user);
        });
    }
    createUserSettings(userSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.save(userSettings);
        });
    }
    createGlobalSettings(globalSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.save(globalSettings);
        });
    }
    createLog(log) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.save(log);
        });
    }
    // Load
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
    loadSettingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.connection.manager.getRepository(UserSettings_1.UserSettings).findOne({ user: userId });
            return settings;
        });
    }
    loadUserSettingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersetting = yield this.connection.manager.getRepository(UserSettings_1.UserSettings).findOne({ user: userId });
            return usersetting;
        });
    }
    loadLocalS3BackupRepositoryById(repoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.connection.manager.getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository).findOne({ id: repoId });
            return repo;
        });
    }
    loadLocalS3BackupRepositoryByName(repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.connection.manager.getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository).findOne({ repoName: repoName });
            return repo;
        });
    }
    loadAllLocalS3BackupRepositoryById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.connection.manager.getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository).find({ user: userId });
            return repo;
        });
    }
    loadGlobalSettingsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.connection.manager.getRepository(GlobalSettings_1.GlobalSettings).findOne({ id: id });
            return settings;
        });
    }
    // Delete
    deleteLocalS3BackupRepositoryById(repoId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository).delete({ id: repoId });
        });
    }
    // Others
    countUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.connection.manager.getRepository(User_1.User).count();
            return count;
        });
    }
    createDefaultGlobalSettingsById() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = new GlobalSettings_1.GlobalSettings;
            settings.id = 1;
            settings.enableRegister = true;
            settings.automaticUpdates = true;
            settings.updateCheckInterval = enumTypes_1.UpdateCheckInterval.daily;
            settings.port = 8380;
            yield this.connection.manager.save(settings);
        });
    }
    hash(word) {
        const hash = crypto.createHmac("sha512", "").update(word).digest("hex");
        return hash;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map