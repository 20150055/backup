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
const Mustache = require("mustache");
const fsextra = require("fs-extra");
const types_1 = require("../shared/types");
function generateHTMLTemplate(language, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let template;
        if (language === types_1.Language.de) {
            template = yield fsextra.readFile(__dirname + "/reportMail_de.html");
        }
        else {
            template = yield fsextra.readFile(__dirname + "/reportMail_en.html");
        }
        let rendered = Mustache.render(template.toString(), {
            backupJobId: data.backupJobId,
            jobName: data.jobName,
            repositoryId: data.repositoryId,
            prevScheduledDate: data.prevScheduledDate,
            isActive: data.isActive,
            startDate: data.startDate,
            errorOutput: data.errorOutput,
            time: data.time,
            logLevel: data.logLevel,
            description: data.description
        });
        return rendered;
    });
}
exports.generateHTMLTemplate = generateHTMLTemplate;
//# sourceMappingURL=generateHTML.js.map