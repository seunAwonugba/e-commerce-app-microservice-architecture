const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
require("dotenv").config();
const { sequelize } = require("./models/index");
const { authRouter } = require("./router/auth");
const { addressRouter } = require("./router/address");
const { authMiddleware } = require("./middleware/authMiddleware");

const port = process.env.PORT || 8001;
const host = "localhost";

app.use(express.json());

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "Customer base page",
    });
});

app.use("/", authRouter);
app.use("/", authMiddleware, addressRouter);

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.use(errorMiddleware);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        app.listen(port, host, () => {
            console.log(`server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();
