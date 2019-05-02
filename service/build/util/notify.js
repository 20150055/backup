"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notifier = require("node-notifier");
const constants_1 = require("../constants");
// console.log(resolveRes("icon_real_square.png"));
exports.notifyUser = (options) => {
    notifier.notify({
        title: "Backup380",
        message: options.message,
        icon: constants_1.resolveRes("icon_real_square.png"),
        sound: false,
        wait: false // Wait with callback, until user action is taken against notification
    });
};
//# sourceMappingURL=notify.js.map