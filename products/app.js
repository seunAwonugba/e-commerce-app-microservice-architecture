const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
require("dotenv").config();
const { sequelize } = require("./models/index");
const { productRouter } = require("./router");
const { errorMiddleware, authMiddleware } = require("../middleware");

const port = process.env.PORT || 8002;
const host = "localhost";

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        data: "products service home page",
    });
});

app.use("/", authMiddleware, productRouter);

app.all("*", (req, res) => {
    console.log(res);
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: "Product Resource not found",
    });
});

app.use(errorMiddleware);

//connect to rabbitmq

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log(
            "Product database Connection has been established successfully."
        );

        app.listen(port, host, () => {
            console.log(
                `Product server is listening on http://${host}:${port}`
            );
        });
    } catch (error) {
        console.error("Unable to connect to the product database:", error);
    }
};

startServer();
