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
const BackupJob_1 = require("./BackupJob");
let Log = class Log {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Log.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Log.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Log.prototype, "start", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Log.prototype, "end", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Log.prototype, "output", void 0);
__decorate([
    typeorm_1.ManyToOne(type => BackupJob_1.BackupJob, backupjob => backupjob.id, { nullable: false }),
    __metadata("design:type", Number)
], Log.prototype, "backupjob", void 0);
__decorate([
    typeorm_1.ManyToOne(type => LocalS3BackupRepository_1.LocalS3BackupRepository, repository => repository.id, { nullable: false }),
    __metadata("design:type", Number)
], Log.prototype, "repository", void 0);
Log = __decorate([
    typeorm_1.Entity()
], Log);
exports.Log = Log;
//# sourceMappingURL=Log.js.map