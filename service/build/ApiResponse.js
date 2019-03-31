"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(res, code, data) {
    res.status(code).json(data);
}
exports.sendResponse = sendResponse;
function sendResponseFile(res, code, filePath) {
    res.status(code).sendFile(filePath);
}
exports.sendResponseFile = sendResponseFile;
//# sourceMappingURL=ApiResponse.js.map