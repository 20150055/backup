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
// update ausführen
const express = require("express");
const types_1 = require("../../../shared/types");
const ApiResponse_1 = require("../../../ApiResponse");
const checkAuth_1 = require("../../checkAuth");
exports.router = express.Router();
exports.router.post("/update", checkAuth_1.checkAuth, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //const http = new XMLHttpRequest();
        // const url='https://jsonplaceholder.typicode.com/posts';
        // http.open("GET", url);
        // http.send();
        // http.onreadystatechange=(e)=>{
        //     console.log(http.responseText)
        // }
        // let a = $.get("");
        //https://api.github.com/repos/20150055/backup/contents/version?ref=gh-pages
        //const version = Number(Buffer.from(b64string, 'base64').toString()); 
        ApiResponse_1.sendResponse(response, 400, {
            messages: [
                { name: "api.error.globalsettings.get.not-existing", type: types_1.MessageType.error }
            ]
        });
    });
});
//# sourceMappingURL=post.js.map