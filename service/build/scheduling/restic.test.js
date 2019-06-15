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
const resticCallFunctions_1 = require("./resticCallFunctions");
const fs_extra_1 = require("fs-extra");
const rmdir = require("rimraf");
const os_1 = require("os");
const path = require("path");
const types_1 = require("../shared/types");
const log_1 = require("../util/log");
const downloadRestic_1 = require("../util/downloadRestic");
const testRepoFolder = path.join(os_1.tmpdir(), "backup380test", "createRepository");
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    return yield Promise.all([downloadRestic_1.updateRestic(), fs_extra_1.mkdirp(testRepoFolder)]);
}), 99999);
afterAll(done => {
    rmdir(testRepoFolder, done);
});
describe("creating repositories", () => {
    it("creates local repository", () => __awaiter(this, void 0, void 0, function* () {
        const result = yield resticCallFunctions_1.createRepository({
            location: path.join(testRepoFolder, "myRepo"),
            password: "superSecretPassword",
            type: types_1.RepoType.Local
        });
        expect(result).toHaveProperty("fullOutput");
        expect(result.fullOutput).not.toMatch(/(is not recognized as an internal or external command|command not found|no such file or directory|is not recognized)/gi);
        expect(result.fullOutput).not.toMatch(/permission denied/gi);
        expect(result.success).toBe(true);
    }));
});
describe("restic info", () => {
    it("prints the version number", () => __awaiter(this, void 0, void 0, function* () {
        const result = yield resticCallFunctions_1.getResticVersion();
        expect(result.success).toBeTruthy();
        if ("version" in result) {
            expect(result.version).toMatch(/\d+\.\d+\.\d+/);
            expect(result.version >= "0.9.5").toBeTruthy();
        }
        else {
            fail("No version string returned");
        }
    }));
});
describe("repository functions", () => {
    const location = path.join(testRepoFolder, "repoFuncsTest");
    const password = "anotherSecretPassword";
    const type = types_1.RepoType.Local;
    const toBackUp = path.resolve(__dirname, "../__testData__/");
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield resticCallFunctions_1.createRepository({
            location,
            password,
            type
        });
    }));
    afterEach(done => {
        rmdir(location, done);
    });
    it("backs up data to the repository and calls onProgress", () => __awaiter(this, void 0, void 0, function* () {
        const onProgress = jest.fn();
        const response = yield resticCallFunctions_1.executeBackup({
            location,
            password,
            type
        }, 1, [toBackUp], onProgress);
        expect(response.success).toBeTruthy();
        expect(onProgress).toHaveBeenCalled();
        expect(onProgress.mock.calls.length).toBeGreaterThan(0);
    }));
    it("backs up data to the repository when supplying path with spaces", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield resticCallFunctions_1.executeBackup({
            location,
            password,
            type
        }, 1, [path.join(toBackUp, "folder 3")]);
        if (!response.success) {
            log_1.log.testOnly(response);
        }
        expect(response.success).toBeTruthy();
    }));
    it("fails when directory doesn't exist", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield resticCallFunctions_1.executeBackup({
            location,
            password,
            type
        }, 1, [path.join(toBackUp, "thisFolderDoesntExist")]);
        expect(response.success).toBeFalsy();
        expect(response.fullOutput).toMatch(/does not exist/i);
        expect(response.fullOutput).toMatch(/all target .* do not exist/i);
    }));
    it("backs up data to the repository when some folders don't exist", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield resticCallFunctions_1.executeBackup({
            location,
            password,
            type
        }, 1, [
            path.join(toBackUp, "thisFolderDoesntExist"),
            path.join(toBackUp, "folder1", "file1.txt")
        ]);
        expect(response.success).toBeTruthy();
        expect(response.fullOutput).toMatch(/does not exist/i);
        expect(response.fullOutput).toMatch(/skipping/i);
        expect(response.fullOutput).toMatch(/processed 1 files?/i);
    }));
    it("outputs empty snapshot array", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield resticCallFunctions_1.listSnapshots({
            location,
            password,
            type
        });
        if (!response.success) {
            return fail("response.success is false");
        }
        expect(response.snapshots).toBeDefined();
        expect(response.snapshots).toHaveLength(0);
    }));
    describe("snapshot functions", () => {
        beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            return resticCallFunctions_1.executeBackup({
                location,
                password,
                type
            }, 1, [toBackUp]);
        }));
        it("outputs snapshot array", () => __awaiter(this, void 0, void 0, function* () {
            yield resticCallFunctions_1.executeBackup({
                location,
                password,
                type
            }, 1, [toBackUp]);
            const response = yield resticCallFunctions_1.listSnapshots({
                location,
                password,
                type
            });
            if (!response.success) {
                return fail("response.success is false");
            }
            expect(response.snapshots).toBeDefined();
            const sn = response.snapshots;
            expect(sn).toHaveLength(1);
            expect(sn[0].tags).toHaveLength(1);
            expect(sn[0].paths).toHaveLength(1);
            const files = yield resticCallFunctions_1.listFiles({
                location,
                password,
                type
            }, sn[0].id);
            if (!files.success) {
                return fail("response.success is false");
            }
            expect(files.files.length).toBeGreaterThanOrEqual(14);
        }));
        describe("restore", () => {
            const restoreTargetDirectory = path.resolve(testRepoFolder, "../restoreSnapshot");
            beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                return fs_extra_1.mkdirp(restoreTargetDirectory);
            }));
            beforeEach(done => {
                rmdir(restoreTargetDirectory, done);
            });
            it("restores latest snapshot", () => __awaiter(this, void 0, void 0, function* () {
                yield resticCallFunctions_1.executeBackup({
                    location,
                    password,
                    type
                }, 1, [toBackUp]);
                const response = yield resticCallFunctions_1.restoreSnapshot({
                    location,
                    password,
                    type
                }, {
                    restorePath: restoreTargetDirectory,
                    selectedPaths: ["folder1", "folder 3"],
                    snapshotId: "latest"
                });
                expect(response.success).toBeTruthy();
                expect(response.fullOutput).toMatch(/restoring/);
            }));
            it("doesn't restore invalid snapshot", () => __awaiter(this, void 0, void 0, function* () {
                yield resticCallFunctions_1.executeBackup({
                    location,
                    password,
                    type
                }, 1, [toBackUp]);
                const response = yield resticCallFunctions_1.restoreSnapshot({
                    location,
                    password,
                    type
                }, {
                    restorePath: restoreTargetDirectory,
                    selectedPaths: ["folder1", "folder 3"],
                    snapshotId: "thisisinvalid"
                });
                expect(response.success).toBeFalsy();
                expect(response.fullOutput).toMatch(/invalid.*no.*match.*found/i);
            }));
        });
    });
});
//# sourceMappingURL=restic.test.js.map