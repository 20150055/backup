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
const ApiResponse_1 = require("../../../ApiResponse");
const types_1 = require("../../../shared/types");
const path = require("path");
const fs = require("fs");
exports.router = express.Router();
exports.router.get("/certificate", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync(path.join(__dirname, "../../../cert.cert"))) {
            response.status(200).sendFile(path.join(__dirname, "../../../cert.cert"));
        }
        else {
            ApiResponse_1.sendResponse(response, 400, {
                messages: [{
                        name: "api.error.system.certificate.not-found",
                        type: types_1.MessageType.error
                    }]
            });
        }
    });
});
//# sourceMappingURL=sendCertificate.js.map