"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../shared/types");
function createEnv(commonArgs) {
    if (commonArgs.type === types_1.RepoType.Local) {
        return {
            RESTIC_PASSWORD: commonArgs.password,
            RESTIC_REPOSITORY: commonArgs.location
        };
    }
    // restic expects s3 locations to look like this: `s3:https://my.server/backup-bucket`
    const location = commonArgs.location.startsWith("s3:")
        ? commonArgs.location
        : `s3:${commonArgs.location}`;
    return {
        RESTIC_PASSWORD: commonArgs.password,
        RESTIC_REPOSITORY: location,
        AWS_ACCESS_KEY_ID: commonArgs.s3AccessKey,
        AWS_SECRET_ACCESS_KEY: commonArgs.s3SecretKey
    };
}
exports.createEnv = createEnv;
//# sourceMappingURL=helpers.js.map