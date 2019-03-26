"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../shared/types");
const GlobalSettings_1 = require("../../../entity/GlobalSettings");
const enumTypes = require("../../../shared/types/enumTypes");
function checkError(body) {
    let errormessages = [];
    try {
        if (!(body.port &&
            body.automaticUpdates &&
            body.enableRegister &&
            body.updateCheckInterval &&
            body.logfileSize)) {
            if (!body.port) {
                errormessages.push({
                    name: "api.error.globalsettings.create.missing-data.port",
                    type: types_1.MessageType.error
                });
            }
            if (!body.automaticUpdates) {
                errormessages.push({
                    name: "api.error.globalsettings.create.missing-data.automaticUpdates",
                    type: types_1.MessageType.error
                });
            }
            if (!body.enableRegister) {
                errormessages.push({
                    name: "api.error.globalsettings.create.missing-data.enableRegister",
                    type: types_1.MessageType.error
                });
            }
            if (!body.updateCheckInterval) {
                errormessages.push({
                    name: "api.error.globalsettings.create.missing-data.updateCheckInterval",
                    type: types_1.MessageType.error
                });
            }
            if (!body.logfileSize) {
                errormessages.push({
                    name: "api.error.globalsettings.create.missing-data.logfileSize",
                    type: types_1.MessageType.error
                });
            }
        }
        if (body.updateCheckInterval) {
            if (body.updateCheckInterval != enumTypes.UpdateCheckInterval.hourly &&
                body.updateCheckInterval != enumTypes.UpdateCheckInterval.daily &&
                body.updateCheckInterval != enumTypes.UpdateCheckInterval.weekly) {
                errormessages.push({
                    name: "api.error.globalsettings.create.invalid-UpdateCheckInterval",
                    type: types_1.MessageType.error
                });
            }
        }
    }
    catch (error) {
        let errorstring = error.toString();
        errormessages.push({
            name: "api.error.globalsettings.create.other",
            type: types_1.MessageType.error,
            args: { error: errorstring }
        });
    }
    return errormessages;
}
exports.checkError = checkError;
function setValues(body) {
    let settings = new GlobalSettings_1.GlobalSettings();
    settings.port = body.port;
    settings.automaticUpdates = body.automaticUpdates;
    settings.enableRegister = body.enableRegister;
    settings.updateCheckInterval = body.updateCheckInterval;
    settings.logfileSize = body.logfileSize;
    return settings;
}
exports.setValues = setValues;
//# sourceMappingURL=functions.js.map