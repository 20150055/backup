"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const r = require("./downloadRestic");
const constants_1 = require("../constants");
const os_1 = require("os");
const path = require("path");
const fs_extra_1 = require("fs-extra");
const rmdir = require("rimraf");
const fsextra = require("fs-extra");
const downloadFolder = path.join(os_1.tmpdir(), "backup380test", "downloadRestic");
beforeAll(() => {
    return fs_extra_1.mkdirp(downloadFolder);
});
afterAll(done => {
    setTimeout(() => rmdir(downloadFolder, done), 500);
});
describe("utility functions", () => {
    it("fetches the version number", () => __awaiter(this, void 0, void 0, function* () {
        const result = yield r.getCurrentVersion();
        expect(result).toBeDefined();
        expect(result >= constants_1.fallbackResticVersion).toBeTruthy();
    }), 1000 * 60);
});
describe("downloading restic", () => {
    it("downloads restic to a custom directory with spaces", () => __awaiter(this, void 0, void 0, function* () {
        const p = path.join(downloadFolder, "with space", "restic");
        yield r.downloadRestic(yield r.getCurrentVersion(), p, constants_1.OsType.linux);
        const exists = yield fsextra.pathExists(p);
        expect(exists).toBeTruthy();
    }), 1000 * 60 * 5);
    it("downloads restic to a custom directory without spaces", () => __awaiter(this, void 0, void 0, function* () {
        const p = path.join(downloadFolder, "withoutSpace", "restic");
        yield r.downloadRestic(yield r.getCurrentVersion(), p, constants_1.OsType.linux);
        const exists = yield fsextra.pathExists(p);
        expect(exists).toBeTruthy();
    }), 1000 * 60 * 5);
});
//# sourceMappingURL=downloadRestic.test.js.map