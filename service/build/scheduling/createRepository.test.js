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
const _1 = require("./");
const fs_extra_1 = require("fs-extra");
const rmdir = require("rimraf");
const os_1 = require("os");
const path = require("path");
const types_1 = require("../shared/types");
const testRepoFolder = path.join(os_1.tmpdir(), "backup380test", "createRepository");
beforeAll(() => {
    return fs_extra_1.mkdirp(testRepoFolder);
});
afterAll(done => {
    rmdir(testRepoFolder, done);
});
describe("creating repositories", () => {
    it("creates local repository", () => __awaiter(this, void 0, void 0, function* () {
        const result = yield _1.createRepository({
            location: path.join(testRepoFolder, "myRepo"),
            password: "superSecretPassword",
            type: types_1.RepoType.Local
        });
        expect(result).toHaveProperty("fullOutput");
        expect(result.fullOutput).not.toMatch(/(is not recognized as an internal or external command|command not found|no such file or directory|is not recognized)/gi);
        expect(result.fullOutput).not.toMatch(/Permission denied/gi);
        expect(result.success).toBe(true);
    }));
});
//# sourceMappingURL=createRepository.test.js.map