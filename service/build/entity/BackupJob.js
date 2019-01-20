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
const LocalS3BackupRepository_1 = require("./LocalS3BackupRepository");
const Log_1 = require("./Log");
const User_1 = require("./User");
const enumTypes_1 = require("../shared/types/enumTypes");
let BackupJob = class BackupJob {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BackupJob.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], BackupJob.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BackupJob.prototype, "maxBackups", void 0);
__decorate([
    typeorm_1.Column({ length: 24 }),
    __metadata("design:type", String)
], BackupJob.prototype, "emailNotification", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BackupJob.prototype, "backupLocations", void 0);
__decorate([
    typeorm_1.ManyToOne(type => LocalS3BackupRepository_1.LocalS3BackupRepository, repo => repo.id, { nullable: false }),
    __metadata("design:type", Number)
], BackupJob.prototype, "repo", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.id, { nullable: false }),
    __metadata("design:type", Number)
], BackupJob.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => Log_1.Log, log => log.id),
    __metadata("design:type", Array)
], BackupJob.prototype, "log", void 0);
BackupJob = __decorate([
    typeorm_1.Entity()
], BackupJob);
exports.BackupJob = BackupJob;
//# sourceMappingURL=BackupJob.js.map