"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//BackupJob
var EmailNotification;
(function (EmailNotification) {
    EmailNotification["always"] = "always";
    EmailNotification["onerror"] = "onError";
    EmailNotification["never"] = "never";
})(EmailNotification = exports.EmailNotification || (exports.EmailNotification = {}));
//Repository
var RepoType;
(function (RepoType) {
    RepoType["Local"] = "local";
    RepoType["S3"] = "s3";
})(RepoType = exports.RepoType || (exports.RepoType = {}));
// Settings
var UpdateCheckInterval;
(function (UpdateCheckInterval) {
    UpdateCheckInterval["hourly"] = "hourly";
    UpdateCheckInterval["daily"] = "daily";
    UpdateCheckInterval["weekly"] = "weekly";
})(UpdateCheckInterval = exports.UpdateCheckInterval || (exports.UpdateCheckInterval = {}));
var ReportLanguage;
(function (ReportLanguage) {
    ReportLanguage["de"] = "de";
    ReportLanguage["en"] = "en";
    ReportLanguage["gui"] = "gui";
})(ReportLanguage = exports.ReportLanguage || (exports.ReportLanguage = {}));
var Language;
(function (Language) {
    Language["de"] = "de";
    Language["en"] = "en";
})(Language = exports.Language || (exports.Language = {}));
//Update
var UpdateResponse;
(function (UpdateResponse) {
    UpdateResponse["done"] = "done";
    UpdateResponse["doneDummy"] = "done-dummy";
    UpdateResponse["upToDate"] = "version-up-to-date";
    UpdateResponse["updateFailed"] = "update-failed";
    UpdateResponse["downloadFailed"] = "download-failed";
})(UpdateResponse = exports.UpdateResponse || (exports.UpdateResponse = {}));
//# sourceMappingURL=enumTypes.js.map