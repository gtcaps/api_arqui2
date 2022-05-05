const express = require('express');
const cors = require('cors');
const app = express();
const port = 80;

const conn = require('./db');

app.use(express.json());
app.use(cors({origin: '*'}));

app.get("/", (req, res) => {
    conn.query("SELECT * FROM programming_languages", (err, data, fields) => {
        if (err) {
            res.json({message: "Sin información"});
        } 

        res.status(200).json(data);

    });
});

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});