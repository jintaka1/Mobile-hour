import mysql from "mysql2/promise";

export const db_conn = mysql.createPool({
    host:"localhost",
    port: 3307,
    user:"mobile-hour-admin",
    password:"password",
    database:"mobile-hour-jin"

});