import { createConnection, Connection } from "typeorm";
import { Database } from "./Database";

let database: Database = null;
let connection: Connection = null;

createConnection().then(async conn => {
    connection = conn;
    database = new Database(connection);
}).catch(error => console.log(error));


export { database }