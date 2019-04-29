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
const Log_1 = require("./entity/Log");
const Client_1 = require("./entity/Client");
const Admin_1 = require("./entity/Admin");
class Database {
    constructor(conn) {
        this.connection = conn;
    }
    // Create
    createLocalBackupRepository(repository) {
        return __awaiter(this, void 0, void 0, function* () {
            repository.repoPassword = repository.repoPassword;
            // repository.repoPassword = this.hash(repository.repoPassword);
            return yield this.connection.manager.save(repository);
        });
    }
    createS3BackupRepository(repository) {
        return __awaiter(this, void 0, void 0, function* () {
            repository.repoPassword = repository.repoPassword;
            // repository.repoPassword = this.hash(repository.repoPassword);
            return yield this.connection.manager.save(repository);
        });
    }
    createBackupjob(backupJob) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.manager.save(backupJob);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = this.hash(user.password);
            user = yield this.connection.manager.save(user);
            return user;
        });
    }
    patchUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.manager.save(user);
        });
    }
    setUserToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.connection.manager
                .getRepository(User_1.User)
                .findOne({ id: userId });
            if (user) {
                user.token = token;
                yield this.connection.manager.save(user);
                return true;
            }
            return false;
        });
    }
    createUserSettings(userSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.manager.save(userSettings);
        });
    }
    createGlobalSettings(globalSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldSettings = yield this.loadGlobalSettingsById(globalSettings.id);
            if (oldSettings) {
                if (globalSettings.logfileSize < oldSettings.logfileSize) {
                    yield this.reduceLogTable(globalSettings.logfileSize);
                }
            }
            return yield this.connection.manager.save(globalSettings);
        });
    }
    createLog(log) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.loadGlobalSettingsById(1);
            log = yield this.connection.manager.save(log);
            if (settings) {
                const deleteId = log.id - settings.logfileSize;
                this.deleteLogById(deleteId);
            }
            return log;
        });
    }
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.manager.save(client);
        });
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = new Admin_1.Admin();
            admin.clients = [];
            admin.id = 1;
            yield this.connection.manager.save(admin);
        });
    }
    // Load
    loadClientById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.connection.manager
                .getRepository(Client_1.Client)
                .findOne({ id: clientId });
            return client;
        });
    }
    loadAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.connection.manager.getRepository(Client_1.Client).find();
            return clients;
        });
    }
    loadUserByUsername(searchUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager
                .getRepository(User_1.User)
                .findOne({ username: searchUsername });
            return user;
        });
    }
    loadUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager
                .getRepository(User_1.User)
                .findOne({ email: email });
            return user;
        });
    }
    loadUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager
                .getRepository(User_1.User)
                .findOne({ id: id });
            return user;
        });
    }
    loadAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.connection.manager
                .getRepository(Admin_1.Admin)
                .findOne({ id: id });
            return admin;
        });
    }
    loadBackupJobByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.connection.manager
                .getRepository(BackupJob_1.BackupJob)
                .findOne({ name: name });
            return job;
        });
    }
    loadBackupJobById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.connection.manager
                .getRepository(BackupJob_1.BackupJob)
                .findOne({ id: id });
            return job;
        });
    }
    loadSettingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.connection.manager
                .getRepository(UserSettings_1.UserSettings)
                .findOne({ user: userId });
            return settings;
        });
    }
    loadUserSettingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersetting = yield this.connection.manager
                .getRepository(UserSettings_1.UserSettings)
                .findOne({ user: userId });
            return usersetting;
        });
    }
    loadLocalS3BackupRepositoryById(repoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.connection.manager
                .getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository)
                .findOne({ id: repoId });
            return repo;
        });
    }
    loadLocalS3BackupRepositoryByName(repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.connection.manager
                .getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository)
                .findOne({ repoName: repoName });
            return repo;
        });
    }
    loadAllLocalS3BackupRepositoryById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.connection.manager
                .getRepository(LocalS3BackupRepository_1.LocalS3BackupRepository)
                .find({ user: userId });
            return repo;
        });
    }
    loadAllBackupJobsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.connection.manager
                .getRepository(BackupJob_1.BackupJob)
                .find({ user: userId });
            return jobs;
        });
    }
    loadAllActiveBackupJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.connection.manager
                .getRepository(BackupJob_1.BackupJob)
                .find({ active: true, archived: false });
            return jobs;
        });
    }
    loadGlobalSettingsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.connection.manager
                .getRepository(GlobalSettings_1.GlobalSettings)
                .findOne({ id: id });
            return settings;
        });
    }
    loadLogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = yield this.connection.manager
                .getRepository(Log_1.Log)
                .findOne({ id: id });
            return log;
        });
    }
    // Delete
    deleteLocalS3BackupRepositoryById(repoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.loadLocalS3BackupRepositoryById(repoId);
            if (repo) {
                repo.archived = true;
                repo.repoName += "-archived";
                if (repo.repoType === enumTypes_1.RepoType.Local) {
                    yield this.createLocalBackupRepository(repo);
                }
                else {
                    yield this.createS3BackupRepository(repo);
                }
                if (repo.backupjob && repo.backupjob.length > 0) {
                    repo.backupjob.forEach((job) => __awaiter(this, void 0, void 0, function* () {
                        yield this.deleteBackupJobById(job.id);
                    }));
                }
            }
            return repo;
        });
    }
    deleteClientById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager
                .getRepository(Client_1.Client)
                .delete({ id: clientId });
        });
    }
    deleteBackupJobById(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.loadBackupJobById(jobId);
            if (job) {
                job.archived = true;
                job.name += "-archived";
                job.emailNotification = enumTypes_1.EmailNotification.never;
                return yield this.createBackupjob(job);
            }
            return job;
        });
    }
    deleteLogById(logId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.getRepository(Log_1.Log).delete({ id: logId });
        });
    }
    // Others
    countUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.connection.manager.getRepository(User_1.User).count();
            return count;
        });
    }
    countLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.connection.manager.getRepository(Log_1.Log).count();
            return count;
        });
    }
    getLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield this.connection.manager.getRepository(Log_1.Log).find();
            return logs;
        });
    }
    getFilteredLogsOther() {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.logType = :type", { type: enumTypes_1.LogType.other })
                .getMany();
            return logs;
        });
    }
    getFilteredLogsClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.client = :id", { id: clientId })
                .getMany();
            return logs;
        });
    }
    getFilteredLogsRepository(repoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.repository = :id", { id: repoId })
                .getMany();
            return logs;
        });
    }
    getFilteredLogsBackupJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.backupJob = :id", { id: jobId })
                .getMany();
            return logs;
        });
    }
    createDefaultGlobalSettingsById() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = new GlobalSettings_1.GlobalSettings();
            settings.id = 1;
            settings.enableRegister = true;
            settings.automaticUpdates = true;
            settings.updateCheckInterval = enumTypes_1.UpdateCheckInterval.daily;
            settings.port = 8380;
            settings.logfileSize = 500;
            settings.lastUpdateCheck = 0;
            yield this.connection.manager.save(settings);
        });
    }
    reduceLogTable(size) {
        return __awaiter(this, void 0, void 0, function* () {
            let logs = yield this.getLogs();
            if (logs.length <= size) {
                return;
            }
            let count = 0;
            while (logs.length - count > size) {
                yield this.deleteLogById(logs[count].id);
                count++;
            }
        });
    }
    hash(word) {
        const hash = crypto
            .createHmac("sha512", "dsfpoldkqp")
            .update(word)
            .digest("hex");
        return hash;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map