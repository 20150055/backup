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
const Admin_1 = require("./Admin");
const Log_1 = require("./Log");
let Client = class Client {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Client.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Client.prototype, "os", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    typeorm_1.ManyToOne(type => Admin_1.Admin, admin => admin.clients),
    __metadata("design:type", Number)
], Client.prototype, "admin", void 0);
__decorate([
    typeorm_1.OneToMany(type => Log_1.Log, log => log.id, { nullable: true }),
    __metadata("design:type", Array)
], Client.prototype, "log", void 0);
Client = __decorate([
    typeorm_1.Entity()
], Client);
exports.Client = Client;
//# sourceMappingURL=Client.js.map