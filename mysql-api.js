const express = require('express');
const mysql = require('mysql2/promise');
const { createPool } = require('mysql2/promise');
const app = express();
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'node-test'
});
app.use(express.json());
app.get('/', async (req, resp) => {
    try {
        const con = await pool.getConnection();
        const [result] = await con.query("select * from users");
        con.release();
        console.log(result);
        resp.status(200).json(result);
    } catch (error) {
        console.error("Error on MySQL database connection", error);
        resp.status(500).json({ message: `Error on MySQL database connection: ${error}` });
    }
});

app.post('/', async (req, resp) => {
    try {
        const body = req.body;
        const con = await pool.getConnection();
        const result = await con.query("insert into users (Name,Email,Password) values ?",[body.map(Object.values)]);
        console.log(result);
        resp.status(200).json(result);
    } catch (error) {
        console.log("error on mysql database connection", error);
        resp.status(500).json({ message: `error on mysql database connection ${error}` })
    }
})
app.put('/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const con = await pool.getConnection();
        const result = await con.query("update users set ? where id=?", [req.body,id]);
        console.log(result);
        resp.status(200).json(result);
    } catch (error) {
        console.log("error on mysql database connection", error);
        resp.status(500).json({ message: `error on mysql database connection ${error}` })
    }
})

app.delete('/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const con = await pool.getConnection();
        const result = await con.query("delete from users where id=?", [id]);
        console.log(result);
        resp.status(200).json(result);
    } catch (error) {
        console.log("error on mysql database connection", error);
        resp.status(500).json({ message: `error on mysql database connection ${error}` })
    }
})


app.listen(5400, (err) => {
    if (err) {
        console.error("Server start error: " + err);
    } else {
        console.log("Server running on port 5400");
    }
});