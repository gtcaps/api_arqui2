const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

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
    conn.query("select tipo, valor, date_format(fecha, '%d/%m/%Y %H:%i:%s') as fecha from datos_arduino;", (err, data, fields) => {
        if (err) res.json({data: null});

        res.status(200).json(data);
    });
});

app.get("/co2", (req, res) => {
    conn.query("select tipo, valor, date_format(fecha, '%d/%m/%Y %H:%i:%s') as fecha from datos_arduino where lower(tipo) = 'co2';", (err, data, fields) => {
        if (err) res.json({data: null});

        res.status(200).json(data);
    });
});

app.get("/temp", (req, res) => {
    conn.query("select tipo, valor, date_format(fecha, '%d/%m/%Y %H:%i:%s') as fecha from datos_arduino where lower(tipo) = 'temp';", (err, data, fields) => {
        if (err) res.json({data: null});

        res.status(200).json(data);
    });
});

app.get("/gas", (req, res) => {
    conn.query("select tipo, valor, date_format(fecha, '%d/%m/%Y %H:%i:%s') as fecha from datos_arduino where lower(tipo) = 'isGas';", (err, data, fields) => {
        if (err) res.json({data: null});

        res.status(200).json(data);
    });
});

app.get("/chispa", (req, res) => {
    conn.query("select tipo, valor, date_format(fecha, '%d/%m/%Y %H:%i:%s') as fecha from datos_arduino where lower(tipo) = 'isChispa';", (err, data, fields) => {
        if (err) res.json({data: null});

        res.status(200).json(data);
    });
});


app.post("/datos", (req, res) => {
    let tipo = req.body.tipo;
    let valor = req.body.valor;

    let moment = require('moment'); // require
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss"); 

    if (!tipo || !valor) {
        res.status(502).json({
            mensaje: 'Los campos tipo y valor son requeridos'
        });
    }

    console.log(tipo);
    console.log(valor);
    console.log(fecha);

    conn.query(`insert into datos_arduino(tipo, valor, fecha) values ('${tipo}', ${valor}, '${fecha}')`, (err, data, fieds) => {
        if (err) res.status(500).json({mensaje: 'No se pudo registrar el dato'});

        res.status(201).json({mensaje: 'Dato registrado', fecha_registro: fecha});

    });

});

app.post("/datos_full/:datos", (req, res) => {
    let datos = req.params.datos;

    if (!datos || datos === "") {
        res.status(502).json({
            mensaje: `Se requiere del campo "datos"`
        });
    }

    let datosSplit = datos.split("-");

    if (datosSplit.length === 4) {
        let temperatura = datosSplit[0];
        let co2 = datosSplit[1];
        let chispa = datosSplit[2];
        let gas = datosSplit[3];

        let moment = require('moment'); // require
        let fecha = moment().format("YYYY-MM-DD HH:mm:ss"); 

        conn.query(`insert into datos_arduino(tipo, valor, fecha) values ('temp', ${temperatura}, '${fecha}'), ('co2', ${co2}, '${fecha}'), ('isChispa', ${chispa}, '${fecha}'), ('isGas', ${gas}, '${fecha}')`, (err, data, fields) => {
            if (err) res.status(500).json({mensaje: 'No se pudieron registrar los datos'});

            res.status(201).json({
                mensaje: 'Datos Registrados',
                temperatura: temperatura,
                co2: co2,
                isChispa: chispa,
                isGas: gas
            });
        });
    }
});


app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});