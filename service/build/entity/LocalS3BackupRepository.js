"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BackupJob_1 = require("./BackupJob");
const Log_1 = require("./Log");
const User_1 = require("./User");
const enumTypes_1 = require("../shared/types/enumTypes");
let LocalS3BackupRepository = class LocalS3BackupRepository {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LocalS3BackupRepository.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], LocalS3BackupRepository.prototype, "archived", void 0);
__decorate([
    typeorm_1.Column({ length: 9 }),
    __metadata("design:type", String)
], LocalS3BackupRepository.prototype, "repoType", void 0);
__decorate([
    typeorm_1.Column({ length: 50, unique: true }),
    __metadata("design:type", String)
], LocalS3BackupRepository.prototype, "repoName", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], LocalS3BackupRepository.prototype, "repoPassword", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LocalS3BackupRepository.prototype, "autoUnlock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LocalS3BackupRepository.prototype, "repoLocation", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocalS3BackupRepository.prototype, "accessKey", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocalS3BackupRepository.prototype, "secretAccessKey", void 0);
__decorate([
    typeorm_1.OneToMany(type => BackupJob_1.BackupJob, backupjob => backupjob.id),
    __metadata("design:type", Array)
], LocalS3BackupRepository.prototype, "backupjob", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.id, { nullable: false }),
    __metadata("design:type", Number)
], LocalS3BackupRepository.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => Log_1.Log, log => log.id),
    __metadata("design:type", Array)
], LocalS3BackupRepository.prototype, "log", void 0);
LocalS3BackupRepository = __decorate([
    typeorm_1.Entity()
], LocalS3BackupRepository);
exports.LocalS3BackupRepository = LocalS3BackupRepository;
//# sourceMappingURL=LocalS3BackupRepository.js.map