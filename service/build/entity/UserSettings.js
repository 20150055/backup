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
const User_1 = require("./User");
const enumTypes_1 = require("../shared/types/enumTypes");
let UserSettings = class UserSettings {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserSettings.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => User_1.User, { nullable: false }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], UserSettings.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], UserSettings.prototype, "sendEmails", void 0);
__decorate([
    typeorm_1.Column({ default: enumTypes_1.ReportLanguage.gui }),
    __metadata("design:type", String)
], UserSettings.prototype, "reportLanguage", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSettings.prototype, "smtpHostname", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserSettings.prototype, "smtpPort", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSettings.prototype, "smtpUsername", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSettings.prototype, "smtpPassword", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSettings.prototype, "smtpFrom", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSettings.prototype, "smtpTo", void 0);
__decorate([
    typeorm_1.Column({ default: enumTypes_1.Language.en, length: 2 }),
    __metadata("design:type", String)
], UserSettings.prototype, "language", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], UserSettings.prototype, "showSnackbar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserSettings.prototype, "themePrimary", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserSettings.prototype, "themeSecondary", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserSettings.prototype, "themeAccent", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], UserSettings.prototype, "darktheme", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSettings.prototype, "defaultEmailNotification", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserSettings.prototype, "defaultMaxBackupsPerRepo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserSettings.prototype, "defaultUnlockTime", void 0);
UserSettings = __decorate([
    typeorm_1.Entity()
], UserSettings);
exports.UserSettings = UserSettings;
//# sourceMappingURL=UserSettings.js.map