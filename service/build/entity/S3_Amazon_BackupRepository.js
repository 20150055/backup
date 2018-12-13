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
const Local_SFTP_BackupRepository_1 = require("./Local_SFTP_BackupRepository");
let S3_Amazon_BackupRepository = class S3_Amazon_BackupRepository extends Local_SFTP_BackupRepository_1.Local_SFTP_BackupRepository {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], S3_Amazon_BackupRepository.prototype, "accessKey", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], S3_Amazon_BackupRepository.prototype, "secretAccessKey", void 0);
S3_Amazon_BackupRepository = __decorate([
    typeorm_1.Entity()
], S3_Amazon_BackupRepository);
exports.S3_Amazon_BackupRepository = S3_Amazon_BackupRepository;
//# sourceMappingURL=S3_Amazon_BackupRepository.js.map