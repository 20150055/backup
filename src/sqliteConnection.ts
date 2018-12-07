import { createConnection, Connection } from "typeorm";

let connection: Connection = null;

createConnection().then(async conn => {
    connection = conn;
}).catch(error => console.log(error));

export { connection }