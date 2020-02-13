"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const forge = require("node-forge");
const { pki, md } = forge;
function generateCertFingerprint(client) {
    const certpem = fs.readFileSync(path.join(__dirname, "clientcert" + client.id + ".pem"), "utf8");
    const cert = pki.certificateFromPem(certpem);
    const der = forge.asn1.toDer(pki.certificateToAsn1(cert)).getBytes();
    const m = md.sha256.create();
    m.start();
    m.update(der);
    const fingerprint = m
        .digest()
        .toHex()
        .match(/.{2}/g)
        .join(":")
        .toUpperCase();
    return fingerprint;
}
exports.generateCertFingerprint = generateCertFingerprint;
//# sourceMappingURL=functions.js.map