"use strict";
// TODO: Logwriter
// TODO: Database Authentification
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
//Webserver
app.use(express_1.default.static('../gui/dist'));
app.listen(8080);
// //Local Database
// // open the database
// let db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
// // sqlite3.OPEN_READONLY: open the database for read-only.
// // sqlite3.OPEN_READWRITE : open the database for reading and writting.
// // sqlite3.OPEN_CREATE: open the database, if the database does not exist, create a new database.
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the database.');
// });
// // read from database
// db.serialize(() => {
//   db.each(`SELECT * FROM person`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//   });
// });
// // close database
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
