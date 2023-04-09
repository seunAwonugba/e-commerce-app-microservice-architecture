const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { CustomerService } = require("../service/customer-service");
const amqplib = require("amqplib");

const authRouter = express.Router();
const customerService = new CustomerService();

let channel, connection;

const amqpServer = process.env.RABBIT_MQ_URL || "amqp://localhost:5672";
const queueToConsume = "PRODUCT_SERVICE_QUEUE";
//consume product services,
const connect = async () => {
    console.log("customer service amqp starting...");

    try {
        connection = await amqplib.connect(amqpServer);
        channel = await connection.createChannel();

        // consume all the created products that are not acknowledged
        await channel.consume(queueToConsume, (data) => {
            console.log(
                `Received all created products ${Buffer.from(data.content)}`
            );
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
};
authRouter.post("/sign-up", async (req, res, next) => {
    try {
        const signUp = await customerService.signUp(req.body);
        return res.status(StatusCodes.CREATED).json(signUp);
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const login = await customerService.login(req.body);
        return res.status(StatusCodes.CREATED).json(login);
    } catch (error) {
        next(error);
    }
});

connect();

module.exports = { authRouter };
