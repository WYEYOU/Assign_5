import mysql from "mysql";

export const conn = mysql.createPool(
    {
        connectionLimit: 10,
        host: "sql6.freemysqlhosting.net",
        user: "sql6689860",
        password: "j3dskUktv4",
        database: "sql6689860"
    }
);