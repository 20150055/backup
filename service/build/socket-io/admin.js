"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
app_1.io.on("connection", function (socket) {
    console.log("connected");
});
app_1.io.on("starting Installation", function (socket) {
    console.log("starting Installation");
});
//# sourceMappingURL=admin.js.map