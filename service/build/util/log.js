"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const fsextra = require("fs-extra");
const path = require("path");
let resolve;
const fileStream = new Promise(r => (resolve = r));
fsextra.ensureDir(path.dirname(constants_1.getServerLogfilePath())).then(() => {
    resolve(fsextra.createWriteStream(constants_1.getServerLogfilePath(), { flags: "a" }));
});
const writeLog = (...args) => {
    if (constants_1.curEnv === constants_1.Env.prod) {
        fileStream.then(str => str.write(`${JSON.stringify(args)}\n`));
    }
    else {
        console.log(...args);
    }
};
exports.log = {
    /**
     * Will be written to `stdout` in tests and development and to file in production
     * @param args
     */
    info(...args) {
        writeLog("info", ...args);
    },
    /**
     * Will be written to `stdout` in tests and development and to file in production
     * @param args
     */
    error(...args) {
        writeLog("error", ...args);
    },
    /**
     * Won't be written to file in production
     * @param args
     */
    debug(...args) {
        if (constants_1.curEnv !== constants_1.Env.prod) {
            writeLog("debug", ...args);
        }
    },
    /**
     * Only log in tests
     * @param args
     */
    testOnly(...args) {
        if (constants_1.curEnv === constants_1.Env.test) {
            writeLog("test", ...args);
        }
    },
    /**
     * Only log in production
     * @param args
     */
    prodOnly(...args) {
        if (constants_1.curEnv === constants_1.Env.prod) {
            writeLog("prod", ...args);
        }
    },
    /**
     * Only log in development
     * @param args
     */
    devOnly(...args) {
        if (constants_1.curEnv === constants_1.Env.dev) {
            writeLog("dev", ...args);
        }
    }
};
//# sourceMappingURL=log.js.map