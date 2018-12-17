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
let ScheduledBackup = class ScheduledBackup {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ScheduledBackup.prototype, "backupId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ScheduledBackup.prototype, "weeklyRepeat", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], ScheduledBackup.prototype, "starttime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "monday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "tuesday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "wednesday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "thursday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "friday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "saturday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ScheduledBackup.prototype, "sunday", void 0);
ScheduledBackup = __decorate([
    typeorm_1.Entity()
], ScheduledBackup);
exports.ScheduledBackup = ScheduledBackup;
//# sourceMappingURL=ScheduledBackup.js.map