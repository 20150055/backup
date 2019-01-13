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
let LocalAmazonS3BackupRepository = class LocalAmazonS3BackupRepository {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LocalAmazonS3BackupRepository.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 9 }),
    __metadata("design:type", String)
], LocalAmazonS3BackupRepository.prototype, "repoType", void 0);
__decorate([
    typeorm_1.Column({ length: 50, unique: true }),
    __metadata("design:type", String)
], LocalAmazonS3BackupRepository.prototype, "repoName", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], LocalAmazonS3BackupRepository.prototype, "repoPassword", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LocalAmazonS3BackupRepository.prototype, "autoUnlock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LocalAmazonS3BackupRepository.prototype, "repoLocation", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocalAmazonS3BackupRepository.prototype, "accessKey", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocalAmazonS3BackupRepository.prototype, "secretAccessKey", void 0);
__decorate([
    typeorm_1.OneToMany(type => BackupJob_1.BackupJob, backupjob => backupjob.id),
    __metadata("design:type", Array)
], LocalAmazonS3BackupRepository.prototype, "backupjob", void 0);
__decorate([
    typeorm_1.OneToMany(type => Log_1.Log, log => log.id),
    __metadata("design:type", Array)
], LocalAmazonS3BackupRepository.prototype, "log", void 0);
LocalAmazonS3BackupRepository = __decorate([
    typeorm_1.Entity()
], LocalAmazonS3BackupRepository);
exports.LocalAmazonS3BackupRepository = LocalAmazonS3BackupRepository;
//# sourceMappingURL=LocalAmazonS3BackupRepository.js.map