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
const express = require("express");
const cp = require("child_process");
const fs = require("fs");
const types_1 = require("../../../shared/types");
const ApiResponse_1 = require("../../../ApiResponse");
const path = require("path");
const ssh = require("ssh2");
const scp = require("scp2");
const index_1 = require("../../../index");
const logging_1 = require("../../../logging");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
exports.router.post("/clientInstall", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let adminClient = request.body;
        let client;
        let responseString = "";
        if (adminClient.os === "Windows") {
            const mkdir = cp.exec('Start-Process -Verb runAs powershell.exe -ArgumentList \' -Command "New-Item -ItemType Directory -Force -Path "C:\\Program Files\\Backup380""\'');
            const copy = cp.exec('powershell.exe Copy-Item -Path ..\\Setup\\Windows\\install.ps1 -Destination "\\\\' +
                adminClient.ip +
                '\\admin$"');
            client = cp.exec("..\\scripts\\PsExec.exe \\\\" +
                adminClient.ip +
                " -u " +
                adminClient.username +
                " -s -p " +
                adminClient.password +
                ' /accepteula cmd /c "powershell.exe -executionpolicy bypass -noninteractive -File C:\\Windows\\install.ps1 -path "C:\\Program Files\\Backup380" -mode "i" > "C:\\Program Files\\Backup380\\installlog.txt""', function (err, stdout, stderr) {
                console.log("err", err);
                if (!err) {
                    fs.readFile("\\\\" +
                        adminClient.ip +
                        "\\c$\\Program Files\\Backup380\\installlog.txt", function (err, data) {
                        if (data.indexOf("Error:") !== -1) {
                            responseString +=
                                "installation finished with an error, a log can be found in the installation folder (C:\\Program Files\\Backup380)\n";
                            responseString += data;
                        }
                        else {
                            responseString +=
                                "installation finished successfully, a log can be found in the installation folder (C:\\Program Files\\Backup380)\n";
                            responseString += data;
                        }
                        if (responseString.indexOf("Operation finished") >= 0) {
                            const log = {
                                message: responseString,
                                logType: types_1.LogType.client,
                                status: types_1.LogStatus.success,
                                eventDescription: "api.success.client.install"
                            };
                            logging_1.createLog(log);
                        }
                        else {
                            const log = {
                                message: responseString,
                                logType: types_1.LogType.client,
                                status: types_1.LogStatus.error,
                                eventDescription: "api.error.client.install"
                            };
                            logging_1.createLog(log);
                        }
                        index_1.io.of("/api/").emit("finishedInstall", responseString, "Windows");
                    });
                }
                else {
                    index_1.io.of("/api/").emit("finishedInstall", "there was an error while executing the install script check your connection to the client and your credentials", "Windows");
                }
            });
        }
        else if (adminClient.os === "Linux") {
            let called = false;
            const Client = ssh.Client;
            client = new Client();
            scp.scp("../Setup/Linux/install.sh", {
                host: adminClient.ip,
                username: adminClient.username,
                password: adminClient.password,
                path: "/home/" + adminClient.username
            }, function (err) {
                if (err) {
                    if (!called) {
                        called = true;
                        if (err.message.indexOf("All configured authentication methods failed") !== -1) {
                            index_1.io.of("/api/").emit("finishedInstall", "Error: Please check your credentials (ip, name, password)", "Linux");
                        }
                        else if (err.message.indexOf("Timed out while waiting for handshake") !==
                            -1) {
                            index_1.io.of("/api/").emit("finishedInstall", "Error: conection to Client failed, check your ip", "Linux");
                        }
                        else {
                            index_1.io.of("/api/").emit("finishedInstall", err, "Linux");
                        }
                    }
                    return;
                }
                client
                    .on("ready", function () {
                    client.exec("dos2unix /home/" +
                        adminClient.username +
                        "/install.sh && chmod +x /home/" +
                        adminClient.username +
                        "/install.sh && /home/" +
                        adminClient.username +
                        '/install.sh -i "/bin/backup380" ', { pty: true }, function (err, stream) {
                        stream.write("" + adminClient.password + "\n");
                        if (err)
                            throw err;
                        stream
                            .on("close", function (code, signal) {
                            if (responseString.indexOf("Operation finished") >= 0) {
                                const log = {
                                    message: responseString,
                                    logType: types_1.LogType.client,
                                    status: types_1.LogStatus.success,
                                    eventDescription: "api.success.client.install"
                                };
                                logging_1.createLog(log);
                            }
                            else {
                                const log = {
                                    message: responseString,
                                    logType: types_1.LogType.client,
                                    status: types_1.LogStatus.error,
                                    eventDescription: "api.error.client.install"
                                };
                                logging_1.createLog(log);
                            }
                            index_1.io.of("/api/").emit("finishedInstall", responseString, "Linux");
                            client.end();
                        })
                            .on("data", function (data) {
                            responseString += data + "\n";
                            console.log("STDOUT: " + data);
                        })
                            .stderr.on("data", function (data) {
                            responseString += data + "\n";
                        });
                    });
                })
                    .connect({
                    host: adminClient.ip,
                    port: 22,
                    username: adminClient.username,
                    password: adminClient.password
                });
            });
        }
        else if (adminClient.os === "MacOS") {
            let called = false;
            const Client = ssh.Client;
            client = new Client();
            scp.scp("../Setup/Mac/install.sh", {
                host: adminClient.ip,
                username: adminClient.username,
                password: adminClient.password,
                path: "/Users/" + adminClient.username + "/Applications"
            }, function (err) {
                if (err) {
                    if (!called) {
                        called = true;
                        if (err.message.indexOf("All configured authentication methods failed") !== -1) {
                            index_1.io.of("/api/").emit("finishedInstall", "Error: Please check your credentials (ip, name, password)", "MacOS");
                        }
                        else if (err.message.indexOf("Timed out while waiting for handshake") !==
                            -1) {
                            index_1.io.of("/api/").emit("finishedInstall", "Error: conection to Client failed, check your ip", "MacOS");
                        }
                        else {
                            index_1.io.of("/api/").emit("finishedInstall", err, "MacOS");
                        }
                    }
                    return;
                }
                client
                    .on("ready", function () {
                    client.exec("mkdir -p /Users/" +
                        adminClient.username +
                        "/Applications/backup380 && perl -pi -e 's/\r\n|\n|\r/\n/g' /Users/" +
                        adminClient.username +
                        "/Applications/install.sh  && chmod +x /Users/" +
                        adminClient.username +
                        "/Applications/install.sh && /Users/" +
                        adminClient.username +
                        "/Applications/install.sh -i '/Users/" +
                        adminClient.username +
                        "/Applications/backup380'", { pty: true }, function (err, stream) {
                        stream.write("" + adminClient.password + "\n");
                        console.log(err);
                        if (err)
                            throw err;
                        stream
                            .on("close", function (code, signal) {
                            if (responseString.indexOf("Operation finished") >= 0) {
                                const log = {
                                    message: responseString,
                                    logType: types_1.LogType.client,
                                    status: types_1.LogStatus.success,
                                    eventDescription: "api.success.client.install"
                                };
                                logging_1.createLog(log);
                            }
                            else {
                                const log = {
                                    message: responseString,
                                    logType: types_1.LogType.client,
                                    status: types_1.LogStatus.error,
                                    eventDescription: "api.error.client.install"
                                };
                                logging_1.createLog(log);
                            }
                            index_1.io.of("/api/").emit("finishedInstall", responseString, "MacOS");
                            client.end();
                        })
                            .on("data", function (data) {
                            responseString += data + "\n";
                            console.log("STDOUT: " + data);
                        })
                            .stderr.on("data", function (data) {
                            responseString += data + "\n";
                            console.log("STDERR: " + data);
                        });
                    });
                })
                    .connect({
                    host: adminClient.ip,
                    port: 22,
                    username: adminClient.username,
                    password: adminClient.password
                });
            });
        }
        ApiResponse_1.sendResponse(response, 200, {
            messages: [
                { name: "api.success.client.install.started", type: types_1.MessageType.success }
            ],
            payload: {}
        });
    });
});
//# sourceMappingURL=install.js.map