const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { errorMiddleware, authMiddleware } = require("../middleware");
require("dotenv").config();
const { sequelize } = require("./models/index");
const {
    addressRouter,
    authRouter,
    customerRouter,
    productRouter,
    wishlistRouter,
    cartRouter,
    ordersRouter,
} = require("./router");

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
app.use("/", authMiddleware, customerRouter);
app.use("/", authMiddleware, wishlistRouter);
app.use("/", authMiddleware, productRouter);
app.use("/", authMiddleware, cartRouter);
app.use("/", authMiddleware, ordersRouter);

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
        console.log(
            "Customer service database connection has been established successfully."
        );

        app.listen(port, host, () => {
            console.log(
                `Customer service: server is listening on http://${host}:${port}`
            );
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();
