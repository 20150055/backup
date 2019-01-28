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
const typeorm_1 = require("typeorm");
const Database_1 = require("./Database");
let database = null;
exports.database = database;
let connection = null;
let databaseReadyResolve;
const databaseReady = new Promise(resolve => {
    databaseReadyResolve = resolve;
});
exports.databaseReady = databaseReady;
typeorm_1.createConnection({
    "type": "sqlite",
    "database": "../Repository.db",
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts", __dirname + "/entity/**/*.ts",
        "src/entity/**/*.js", __dirname + "/entity/**/*.js",
    ],
    "migrations": [
        "src/migration/**/*.ts", __dirname + "/migration/**/*.ts",
        "src/migration/**/*.js", __dirname + "/migration/**/*.js",
    ],
    "subscribers": [
        "src/subscriber/**/*.ts", __dirname + "/subscriber/**/*.ts",
        "src/subscriber/**/*.js", __dirname + "/subscriber/**/*.js",
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}).then((conn) => __awaiter(this, void 0, void 0, function* () {
    connection = conn;
    exports.database = database = new Database_1.Database(connection);
    databaseReadyResolve();
})).catch(error => console.log(error));
//# sourceMappingURL=sqliteConnection.js.map