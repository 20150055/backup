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
const enumTypes_1 = require("../shared/types/enumTypes");
let GlobalSettings = class GlobalSettings {
    constructor() {
        this.lastUpdateCheck = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GlobalSettings.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], GlobalSettings.prototype, "enableRegister", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], GlobalSettings.prototype, "automaticUpdates", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GlobalSettings.prototype, "updateCheckInterval", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], GlobalSettings.prototype, "lastUpdateCheck", void 0);
__decorate([
    typeorm_1.Column({ default: 8380 }),
    __metadata("design:type", Number)
], GlobalSettings.prototype, "port", void 0);
__decorate([
    typeorm_1.Column({ default: 1000 }),
    __metadata("design:type", Number)
], GlobalSettings.prototype, "logfileSize", void 0);
GlobalSettings = __decorate([
    typeorm_1.Entity()
], GlobalSettings);
exports.GlobalSettings = GlobalSettings;
//# sourceMappingURL=GlobalSettings.js.map