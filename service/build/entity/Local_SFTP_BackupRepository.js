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
let Local_SFTP_BackupRepository = class Local_SFTP_BackupRepository {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Local_SFTP_BackupRepository.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 9 }),
    __metadata("design:type", String)
], Local_SFTP_BackupRepository.prototype, "repoType", void 0);
__decorate([
    typeorm_1.Column({ length: 50, unique: true }),
    __metadata("design:type", String)
], Local_SFTP_BackupRepository.prototype, "repoName", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], Local_SFTP_BackupRepository.prototype, "repoPassword", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Local_SFTP_BackupRepository.prototype, "autoUnlock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Local_SFTP_BackupRepository.prototype, "repoLocation", void 0);
Local_SFTP_BackupRepository = __decorate([
    typeorm_1.Entity()
], Local_SFTP_BackupRepository);
exports.Local_SFTP_BackupRepository = Local_SFTP_BackupRepository;
//# sourceMappingURL=Local_SFTP_BackupRepository.js.map