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
const LocalS3BackupRepository_1 = require("./LocalS3BackupRepository");
let ClientUser = class ClientUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ClientUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], ClientUser.prototype, "archived", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ClientUser.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], ClientUser.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], ClientUser.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], ClientUser.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], ClientUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], ClientUser.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(type => BackupJob_1.BackupJob, job => job.id),
    __metadata("design:type", Array)
], ClientUser.prototype, "job", void 0);
__decorate([
    typeorm_1.OneToMany(type => LocalS3BackupRepository_1.LocalS3BackupRepository, repo => repo.id),
    __metadata("design:type", Array)
], ClientUser.prototype, "repo", void 0);
ClientUser = __decorate([
    typeorm_1.Entity()
], ClientUser);
exports.ClientUser = ClientUser;
//# sourceMappingURL=ClientUser.js.map