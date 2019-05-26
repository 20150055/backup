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
// import * as Minio from "minio";
const testRepoFolder = path.join(os_1.tmpdir(), "backup380test", "createRepository");
// const minioHost = process.env.TEST_MINIO_HOST || "localhost";
// const minioClient = new Minio.Client({
//   endPoint: minioHost,
//   port: 9000,
//   useSSL: false,
//   accessKey: "AKIAIOSFODNN7EXAMPLE",
//   secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
// });
// const minioEndpoint = (bucketName: string) =>
//   `http://${minioHost}:9000/${bucketName}`;
beforeAll(() => {
    return fs_extra_1.mkdirp(testRepoFolder);
});
afterAll(done => {
    rmdir(testRepoFolder, done);
});
describe("creating repositories", () => {
    const remoteBucketName = "createrepotest";
    // afterAll(() => {
    //   return minioClient.removeBucket(remoteBucketName);
    // });
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
    // it("creates remote repository", async done => {
    //   const result = await createRepository({
    //     location: minioEndpoint(remoteBucketName),
    //     password: "superSecretPassword",
    //     type: RepoType.S3,
    //     s3AccessKey: "AKIAIOSFODNN7EXAMPLE",
    //     s3SecretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    //   });
    //   expect(result).toHaveProperty("fullOutput");
    //   expect(result.fullOutput).not.toMatch(/Fatal/gi);
    //   expect(result.success).toBe(true);
    //   expect(await minioClient.bucketExists(remoteBucketName)).toBeTruthy();
    //   // expect(await minioClient.lis)
    //   const stream = await minioClient.listObjectsV2(
    //     remoteBucketName,
    //     undefined,
    //     true
    //   );
    //   stream.on("error", done);
    //   stream.on("data", event => {
    //     if (event.prefix) {
    //       expect(event.prefix).toEqual("keys/");
    //     } else {
    //       if (/keys/gi.test(event.name)) {
    //         expect(event.name).toMatch(/keys\/[a-z0-9]+/gi);
    //       } else {
    //         expect(event.name).toEqual("config");
    //       }
    //     }
    //     minioClient.removeObject(remoteBucketName, event.name);
    //     done();
    //   });
    // });
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
});
//# sourceMappingURL=restic.test.js.map