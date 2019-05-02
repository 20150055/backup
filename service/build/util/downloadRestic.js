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
const axios_1 = require("axios");
const unbzip2Stream = require("unbzip2-stream");
const fs = require("fs");
const prettyBytes = require("pretty-bytes");
const unzip = require("unzip-stream");
const fsextra = require("fs-extra");
const pad = require("pad");
const ProgressBar = require("progress");
const notify_1 = require("./notify");
const constants_1 = require("../constants");
const path = require("path");
const resticCallFunctions_1 = require("../scheduling/resticCallFunctions");
const getCurrentVersion = () => {
    return axios_1.default
        .get("https://api.github.com/repos/restic/restic/releases/latest")
        .then(res => res.data.tag_name.replace(/v/gi, ""));
};
const getDownloadUrl = (version, os) => `https://github.com/restic/restic/releases/download/v${version}/restic_${version}_${os === constants_1.OsType.darwin
    ? "darwin_386.bz2"
    : os === constants_1.OsType.linux
        ? "linux_amd64.bz2"
        : "windows_amd64.zip"}`;
const downloadRestic = (version, destination, currentOs) => __awaiter(this, void 0, void 0, function* () {
    const url = getDownloadUrl(version, currentOs);
    console.log(`Downloading restic v${version}\n  Source: ${url}\n  Destination: ${destination}\n`);
    notify_1.notifyUser({
        message: `restic v${version} is being downloaded in the background`
    });
    const response = yield axios_1.default.get(url, {
        responseType: "stream"
    });
    yield fsextra.ensureDir(path.dirname(constants_1.resticPath));
    return new Promise((resolve, reject) => {
        const stream = response.data;
        const fileStream = fs.createWriteStream(destination, {
            mode: 0o770,
            autoClose: true
        });
        const contentLength = Number(response.headers["content-length"]);
        const bar = new ProgressBar(`  restic${currentOs === constants_1.OsType.windows ? ".exe" : ""} [:bar] :token1 / :token2    :percent    :etas`, {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: contentLength
        });
        let bytesRead = 0;
        stream.on("data", function (chunk) {
            bytesRead += chunk.length;
            bar.tick(chunk.length, {
                token1: pad(10, prettyBytes(bytesRead)),
                token2: prettyBytes(contentLength)
            });
        });
        stream.pause();
        const onArchiveStreamEnd = () => {
            console.log(`\n  Downloading and extracting restic took ${(Date.now() - start) /
                1000}s`);
            notify_1.notifyUser({
                message: `restic has been downloaded successfully`
            });
            resolve();
        };
        if (currentOs === constants_1.OsType.windows) {
            // unzip
            stream.pipe(unzip.Parse()).on("entry", entry => {
                // we only expect one file in this archive
                if (entry.type !== "File" || !entry.path.startsWith("restic")) {
                    entry.autodrain();
                    reject("Found wrong file in zip archive");
                    return;
                }
                entry.pipe(fileStream);
                entry.once("end", onArchiveStreamEnd);
            });
        }
        else {
            const archiveStream = unbzip2Stream();
            stream.pipe(archiveStream).pipe(fileStream);
            archiveStream.once("end", onArchiveStreamEnd);
        }
        stream.on("error", reject);
        fileStream.on("close", () => {
            fileStream.destroy();
        });
        const start = Date.now();
    });
});
exports.updateRestic = () => __awaiter(this, void 0, void 0, function* () {
    try {
        if (constants_1.curEnv === constants_1.Env.test) {
            console.log(`Restic path: ${constants_1.resticPath}`);
        }
        const isAlreadyDownloaded = yield fsextra.pathExists(constants_1.resticPath); // todo: check if executable matches hash (tamper protection, version update)
        if (isAlreadyDownloaded) {
            const installedVersion = yield resticCallFunctions_1.getResticVersion();
            if (constants_1.curEnv === constants_1.Env.test) {
                console.log(`Restic version output: ${installedVersion.fullOutput}`);
            }
            if ("version" in installedVersion &&
                installedVersion.version >= constants_1.fallbackResticVersion) {
                console.log("restic is already downloaded, skipping download");
                return;
            }
        }
        let currentVersion = constants_1.fallbackResticVersion;
        try {
            currentVersion = yield getCurrentVersion();
        }
        catch (error) {
            console.error(error);
        }
        yield downloadRestic(currentVersion, constants_1.resticPath, constants_1.currentOs);
    }
    catch (error) {
        notify_1.notifyUser({ message: `Error while downloading restic: ${error.message}` });
        console.error(error);
    }
});
//# sourceMappingURL=downloadRestic.js.map