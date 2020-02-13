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
const sqliteConnection_1 = require("../../../sqliteConnection");
const ApiResponse_1 = require("../../../ApiResponse");
const path = require("path");
const forge = require("node-forge");
const entity_1 = require("../../../entity");
const resticPath = path.join(__dirname, "../../../../../scripts/PsExec.exe");
exports.router = express.Router();
const app = express();
const { pki, md } = forge;
exports.router.get("/client/:clientId/cert", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
        let errormessages = [];
        if (client) {
            try {
                const certificate = cp.execSync("powershell.exe Copy-Item -Force -Path '\\\\" +
                    client.ip +
                    "\\c$\\Program Files\\Backup380\\service\\build\\cert.cert' -Destination '" +
                    path.join(__dirname, "clientcert" + client.id + ".cert") +
                    "'");
                const p = path.join(__dirname, "clientcert" + client.id + ".cert");
                /*const addcert = cp.execSync(
                  'powershell -Command "Start-Process -Verb runAs powershell.exe -ArgumentList \' -Command "certutil -addstore "Root" ' +
                    p +
                    "'\""
                );*/
                fs.renameSync(path.join(__dirname, "clientcert" + client.id + ".cert"), path.join(__dirname, "clientcert" + client.id + ".pem"));
                const certpem = fs.readFileSync(path.join(__dirname, "clientcert" + client.id + ".pem"), "utf8");
                const cert = pki.certificateFromPem(certpem);
                const der = forge.asn1.toDer(pki.certificateToAsn1(cert)).getBytes();
                const m = md.sha256.create();
                m.start();
                m.update(der);
                const fingerprint = m.digest()
                    .toHex()
                    .match(/.{2}/g)
                    .join(':')
                    .toUpperCase();
                const oldClient = yield sqliteConnection_1.database.loadClientById(request.params.clientId);
                if (oldClient) {
                    let newClient = new entity_1.Client();
                    newClient.id = oldClient.id;
                    newClient.fingerprint = fingerprint;
                    yield sqliteConnection_1.database.createClient(newClient);
                }
                ApiResponse_1.sendResponse(response, 200, {
                    messages: [
                        {
                            name: "api.success.fetch-cert",
                            type: types_1.MessageType.success
                        }
                    ],
                });
            }
            catch (e) {
                if (e.response === undefined) {
                    errormessages.push({
                        name: "api.error.admin.client.fetch-cert.backup-not-answering",
                        type: types_1.MessageType.error
                    });
                }
            }
        }
        else {
            errormessages.push({
                name: "api.error.admin.client.fetch-cert.client-does-not-exist",
                type: types_1.MessageType.error
            });
            ApiResponse_1.sendResponse(response, 400, {
                messages: errormessages,
            });
        }
    });
});
//# sourceMappingURL=getCertOnClient.js.map