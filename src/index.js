const express = require('express');
const cors = require('cors');
const app = express();
const port = 80;

const conn = require('./db');

app.use(express.json());
app.use(cors({origin: '*'}));

app.get("/", (req, res) => {
    res.status(200).json({
        curso: "Arquitectura de Computadores y Ensambladores 2",
        integrantes: [{
            nombre: "Aybson Mercado",
            carnet: "201700312"
        },{
            nombre: "Elder Andrade",
            carnet: "201700858"
        },{
            nombre: "Julio Wu Chiu",
            carnet: "201906180"
        },{
            nombre: "Henry Peralta",
            carnet: "201712289"
        },{
            nombre: "Victor Cuches",
            carnet: "201807307"
        }]
    });
});

app.get("/datos", (req, res) => {
    conn.query("select tipo, valor, date_format(fecha, '%d/%m/%Y %hh:%i:%ss') as fecha from datos_arduino;", (err, data, fields) => {
        if (err) res.json({data: null});

        res.status(200).json(data);
    });
});

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});