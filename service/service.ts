import sqlite3 from 'sqlite3';
import express from 'express';
const app = express();

//Webserver
app.use(express.static('../gui/dist'));
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