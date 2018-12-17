"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(res, code, data) {
    res.status(code).json(data);
}
exports.sendResponse = sendResponse;
//# sourceMappingURL=ApiResponse.js.map