const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const proxy = require("express-http-proxy");
require("dotenv").config();

const port = process.env.PORT || 8000;
const host = "localhost";

app.use(express.json());

app.use("/api/v1/customer", proxy(`http://${host}:8001`));
app.use("/api/v1/products", proxy(`http://${host}:8002`));
app.use("/api/v1/shopping", proxy(`http://${host}:8003`));

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.listen(port, host, () => {
    console.log(`Gateway server is listening on http://${host}:${port} `);
});
