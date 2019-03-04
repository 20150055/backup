"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
index_1.io.on("connection", function (socket) {
    console.log("connected");
});
index_1.io.on("starting Installation", function (socket) {
    console.log("starting Installation");
});
//# sourceMappingURL=admin.js.map