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
const types_1 = require("../../../shared/types");
const ApiResponse_1 = require("../../../ApiResponse");
const ssh = require("ssh2");
const scp = require("scp2");
const app_1 = require("../../../app");
const cp = require("child_process");
exports.router = express.Router();
exports.router.post("/clientDelete", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let adminClient = request.body;
        let client;
        let responseString = "";
        if (adminClient.os === "Windows") {
            const copy = cp.exec('powershell.exe Copy-Item -Path ..\\Uninstaller\\Windows\\uninstall.ps1 -Destination "\\\\' +
                adminClient.ip +
                '\\admin$"');
            client = cp.exec("..\\scripts\\PsExec.exe \\\\" +
                adminClient.ip +
                " -u " +
                adminClient.username +
                " -s -p " +
                adminClient.password +
                ' /accepteula cmd /c "powershell.exe -Command "Start-Process powershell.exe -ArgumentList \'-executionpolicy bypass -noninteractive -File C:\\Windows\\uninstall.ps1\' -Verb RunAs""', function (err, stdout, stderr) {
                if (!err) {
                    /*fs.readFile(
                      "\\\\" +
                        adminClient.ip +
                        "\\c$\\Program Files\\Backup380\\uninstalllog.txt",
                      function(err, data) {
                        if (data.indexOf("Error:") !== -1) {
                          responseString +=
                            "Uninstallation finished with an error, a log can be found in the installation folder (C:\\Program Files\\Backup380)\n";
                          responseString += data;
                        } else {
                          responseString +=
                            "Uninstallation finished successfully, a log can be found in the installation folder (C:\\Program Files\\Backup380)\n";
                          responseString += data;
                        }*/
                    app_1.io.of("/api/").emit("finishedUninstall", responseString, "Windows");
                    //}
                    //);
                }
                else {
                    app_1.io.of("/api/").emit("finishedUninstall", "there was an error while executing the install script check your connection to the client and your credentials", "Windows");
                }
            });
        }
        else if (adminClient.os === "Linux") {
            let called = false;
            const Client = ssh.Client;
            client = new Client();
            scp.scp("../Uninstaller/Linux/uninstall.sh", {
                host: adminClient.ip,
                username: adminClient.username,
                password: adminClient.password,
                path: "/home/" + adminClient.username
            }, function (err) {
                if (err) {
                    if (!called) {
                        console.log(err.message);
                        called = true;
                        if (err.message.indexOf("All configured authentication methods failed") !== -1) {
                            app_1.io.of("/api/").emit("finishedUninstall", "Error: Please check your credentials (ip, name, password)", "Linux");
                        }
                        else if (err.message.indexOf("Timed out while waiting for handshake") !==
                            -1) {
                            app_1.io.of("/api/").emit("finishedUninstall", "Error: conection to Client failed, check your ip", "Linux");
                        }
                        else {
                            app_1.io.of("/api/").emit("finishedUninstall", err, "Linux");
                        }
                    }
                    return;
                }
                client
                    .on("ready", function () {
                    client.exec("dos2unix /home/" +
                        adminClient.username +
                        "/uninstall.sh && chmod +x /home/" +
                        adminClient.username +
                        "/uninstall.sh && /home/" +
                        adminClient.username +
                        "/uninstall.sh", { pty: true }, function (err, stream) {
                        stream.write("" + adminClient.password + "\n");
                        if (err)
                            throw err;
                        stream
                            .on("close", function (code, signal) {
                            app_1.io.of("/api/").emit("finishedUninstall", responseString, "Linux");
                            client.end();
                        })
                            .on("data", function (data) {
                            responseString += data;
                            console.log("STDOUT: " + data);
                        })
                            .stderr.on("data", function (data) {
                            responseString += data;
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
        else if (adminClient.os === "MacOS") {
            let called = false;
            const Client = ssh.Client;
            client = new Client();
            scp.scp("../Uninstaller/Mac/uninstall.sh", {
                host: adminClient.ip,
                username: adminClient.username,
                password: adminClient.password,
                path: "/Users/" + adminClient.username + "/Applications"
            }, function (err) {
                if (err) {
                    if (!called) {
                        console.log(err.message);
                        called = true;
                        if (err.message.indexOf("All configured authentication methods failed") !== -1) {
                            app_1.io.of("/api/").emit("finishedUninstall", "Error: Please check your credentials (ip, name, password)", "MacOS");
                        }
                        else if (err.message.indexOf("Timed out while waiting for handshake") !==
                            -1) {
                            app_1.io.of("/api/").emit("finishedUninstall", "Error: conection to Client failed, check your ip", "MacOS");
                        }
                        else {
                            app_1.io.of("/api/").emit("finishedUninstall", err, "MacOS");
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
                        "/Applications/uninstall.sh && mv /Users/" +
                        adminClient.username +
                        "/Applications/uninstall.sh /Users/" +
                        adminClient.username +
                        "/Applications/backup380 && sudo chmod +x /Users/" +
                        adminClient.username +
                        "/Applications/backup380/uninstall.sh && sudo /Users/" +
                        adminClient.username +
                        "/Applications/backup380/uninstall.sh ", { pty: true }, function (err, stream) {
                        stream.write("" + adminClient.password + "\n");
                        if (err)
                            throw err;
                        stream
                            .on("close", function (code, signal) {
                            app_1.io.emit("finishedUninstall", responseString, "MacOS");
                            client.end();
                        })
                            .on("data", function (data) {
                            responseString += data;
                            console.log("STDOUT: " + data);
                        })
                            .stderr.on("data", function (data) {
                            responseString += data;
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
                {
                    name: "api.success.client.uninstall.started",
                    type: types_1.MessageType.success
                }
            ],
            payload: {}
        });
    });
});
//# sourceMappingURL=deleteOnClient.js.map