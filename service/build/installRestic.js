"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const downloadRestic_1 = require("./util/downloadRestic");
// entrypoint for installing restic (mainly for tests)
downloadRestic_1.updateRestic().catch(console.error);
//# sourceMappingURL=installRestic.js.map