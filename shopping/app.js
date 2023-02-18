const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
require("dotenv").config();

const port = process.env.PORT || 8003;
const host = "localhost";

app.get("/", (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        data: "shopping service home page",
    });
});

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.listen(port, host, () => {
    console.log(`server is listening on http://${host}:${port}`);
});
