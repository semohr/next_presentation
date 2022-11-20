import mysql from "mysql2/promise";

/** Execute sql query
 * @param {string} sql - sql query
 */
export default async function handler(req, res) {
    const { query } = req.query;

    if (!query) {
        res.status(400).json({ error: "Missing query parameter" });
        return;
    }

    const connection = await mysql.createConnection({
        host: "localhost",
        port: 7256,
        user: "telegram",
        password: "telegram_download",
        database: "telegram",
    });

    const result = await connection.execute(query).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
        return;
    });

    if (result) {
        res.status(200).json(result);
    }

    connection.end();
}
