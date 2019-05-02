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
const axios_1 = require("axios");
const interval = 500;
const isPingEndpointAvailable = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield axios_1.default.get("http://localhost:8380/api/system/ping");
    }
    catch (error) {
        console.error(`Backup380 not up yet (${error})`);
        return false;
    }
    return true;
});
(() => __awaiter(this, void 0, void 0, function* () {
    for (;;) {
        if (yield isPingEndpointAvailable())
            break;
        console.log(`Retrying in ${interval}ms`);
        yield new Promise(r => setTimeout(r, interval));
    }
    console.log("Backup380 is up");
}))();
//# sourceMappingURL=waitForServiceStart.js.map