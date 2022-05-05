const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({origin: '*'}));

app.get("/", (req, res) => {
    res.json({
        message: "ok"
    });
});

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});