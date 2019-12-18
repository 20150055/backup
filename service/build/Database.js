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
const app_1 = require("./app");
const request = require("supertest");
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
    setAdminToken(adminId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.connection.manager
                .getRepository(Admin_1.Admin)
                .findOne({ id: adminId });
            if (admin) {
                admin.token = token;
                yield this.connection.manager.save(admin);
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
    createClientUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager.save(user);
        });
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = new Admin_1.Admin();
            admin.name = "admin1";
            admin.password = "admin1";
            admin.password = this.hash(admin.password);
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
    loadClientWithClientUser(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepo = yield this.connection.manager.getRepository(Client_1.Client);
            const clients = yield clientRepo.find({ relations: ["user"] });
            for (let c of clients) {
                if (c.id == clientId) {
                    return c;
                }
            }
            return null;
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
    deleteDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request(app_1.app).delete("/api/system/AppData"); /*.catch(error => {
              //console.log("data",data);
            });*/
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
    getAllSuccessfullRestores() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection
                .getRepository(Log_1.Log)
                .find({ eventDescription: "api.success.backup.restore-snapshot" });
        });
    }
    getAllBackupJobLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const starts = yield this.connection
                .getRepository(Log_1.Log)
                .find({ eventDescription: "api.info.backup.execute" });
            const success = yield this.connection
                .getRepository(Log_1.Log)
                .find({ eventDescription: "api.success.backup" });
            const error = yield this.connection
                .getRepository(Log_1.Log)
                .find({ eventDescription: "api.error.backup" });
            const jobInfo = {
                starts: starts ? starts : [],
                success: success ? success : [],
                error: error ? error : []
            };
            return jobInfo;
        });
    }
    getAllBackupJobLogsById(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const starts = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.backupJob = :id", { id: jobId })
                .andWhere("eventDescription = :message", { message: "api.info.backup.execute" })
                .orderBy("id", "ASC")
                .getMany();
            const success = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.backupJob = :id", { id: jobId })
                .andWhere("eventDescription = :message", { message: "api.success.backup" })
                .orderBy("id", "ASC")
                .getMany();
            const error = yield this.connection
                .getRepository(Log_1.Log)
                .createQueryBuilder("log")
                .where("log.backupJob = :id", { id: jobId })
                .andWhere("eventDescription = :message", { message: "api.error.backup" })
                .orderBy("id", "ASC")
                .getMany();
            const jobInfo = {
                starts: starts ? starts : [],
                success: success ? success : [],
                error: error ? error : []
            };
            return jobInfo;
        });
    }
    getOldestLogEntryDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection
                .getRepository(Log_1.Log)
                .findOne();
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
    wipeOutDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(Log_1.Log)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(UserSettings_1.UserSettings)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(BackupJob_1.BackupJob)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(LocalS3BackupRepository_1.LocalS3BackupRepository)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(GlobalSettings_1.GlobalSettings)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(Client_1.Client)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(Admin_1.Admin)
                .execute();
            yield this.connection.manager
                .createQueryBuilder()
                .delete()
                .from(User_1.User)
                .execute();
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