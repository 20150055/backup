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
const types_1 = require("../../../shared/types");
const sqliteConnection_1 = require("../../../sqliteConnection");
const enumTypes_1 = require("../../../shared/types/enumTypes");
const LocalS3BackupRepository_1 = require("../../../entity/LocalS3BackupRepository");
function checkError(body, userId, repoId) {
    return __awaiter(this, void 0, void 0, function* () {
        let errormessages = [];
        try {
            if (!(body.repoType &&
                body.repoName &&
                body.repoPassword &&
                body.autoUnlock &&
                body.repoLocation)) {
                if (!body.repoType) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoType",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.repoName) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoName",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.repoPassword) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoPassword",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.autoUnlock) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.autoUnlock",
                        type: types_1.MessageType.error
                    });
                }
                if (!body.repoLocation) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.missing-data.repoLocation",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (body.repoName) {
                const repo = yield sqliteConnection_1.database.loadLocalS3BackupRepositoryByName(body.repoName);
                if (repo) {
                    if (repo.id != repoId) {
                        errormessages.push({
                            name: "api.error.backuprepository.create.reponame-already-existing",
                            type: types_1.MessageType.error
                        });
                    }
                }
            }
            if (body.repoType) {
                if (body.repoType === enumTypes_1.RepoType.S3) {
                    if (!body.accessKey) {
                        if (!body.accessKey) {
                            errormessages.push({
                                name: "api.error.backuprepository.create.missing-data.accessKey",
                                type: types_1.MessageType.error
                            });
                        }
                        if (!body.secretAccessKey) {
                            errormessages.push({
                                name: "api.error.backuprepository.create.missing-data.secretAccessKey",
                                type: types_1.MessageType.error
                            });
                        }
                    }
                }
                else if (body.repoType != enumTypes_1.RepoType.Local) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.invalid-repoType",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (userId) {
                if (!(yield sqliteConnection_1.database.loadUserById(userId))) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.user-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
            if (repoId) {
                if (!(yield sqliteConnection_1.database.loadLocalS3BackupRepositoryById(repoId))) {
                    errormessages.push({
                        name: "api.error.backuprepository.create.repo-not-existing",
                        type: types_1.MessageType.error
                    });
                }
            }
        }
        catch (error) {
            let errorstring = error.toString();
            errormessages.push({
                name: "api.error.backuprepository.create.other",
                type: types_1.MessageType.error,
                args: { error: errorstring }
            });
        }
        return errormessages;
    });
}
exports.checkError = checkError;
function setValues(body, userId) {
    let repo = new LocalS3BackupRepository_1.LocalS3BackupRepository();
    repo.user = userId;
    repo.repoType = body.repoType;
    repo.repoName = body.repoName;
    repo.repoPassword = body.repoPassword;
    repo.autoUnlock = body.autoUnlock;
    repo.repoLocation = body.repoLocation;
    return repo;
}
exports.setValues = setValues;
//# sourceMappingURL=functions.js.map