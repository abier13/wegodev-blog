const express = require('express');
const conn = require('./src/config/db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

moment.locale("id");

const app = express()
const port = 3000


//untuk menangani request json
app.use(express.json());

// get, post, put, patch, delete
app.get('/user', (req, res) => {
    conn.query("SELECT * FROM Users;", (err, result) => {
        if (!err) {
            return res.json(result);
        }
        return res.json({ message: err.message });
    });
});

app.get('/user/:id', (req, res) => {
    conn.query(`SELECT * FROM Users WHERE id = "${req.params.id}";`, (err, result) => {
        if (!err) {
            return res.json(result);
        }
        return res.json({ message: err.message });
    });
});

app.put('/user/:id', (req, res) => {
    const body = req.body;
    const { fullName, email, password } = body;
    const date = moment().format('YYYY-MM-DD hh:mm:ss')
    const id = req.params.id;

    console.log(date);

    conn.query(`UPDATE Users SET fullName="${fullName}",email="${email}", password="${password}", updatedAt="${date}" WHERE id="${id}"`, (err, result) => {
        if (!err) {
            return res.json({ message: "Berhasil mengubah data" });
        }
        return res.json({ message: err.message });
    });

});

app.post("/user", (req, res) => {
    const body = req.body
    const { fullName, email, password } = body
    const date = moment().format('YYYY-MM-DD hh:mm:ss')
    const id = uuidv4();

    console.log("body", body);
    console.log("id", id);
    console.log("date", date);

    conn.query(`INSERT INTO Users (id,fullName, email, role, password, status, createdAt, updatedAt)
    VALUES ("${id}", "${fullName}", "${email}", "Super Admin", "${password}", "Active", "${date}", "${date}");`, (err, result) => {
        if (!err) {
            return res.json({ message: "Berhasil menambahkan data" });
        }
        return res.json({ message: err.message });
    });
});

app.delete('/user/:id', (req, res) => {
    conn.query(`DELETE FROM Users WHERE id = "${req.params.id}";`, (err, result) => {
        if (!err) {
            return res.json({ message: "Berhasil menghapus data" });
        }
        return res.json({ message: err.message });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});