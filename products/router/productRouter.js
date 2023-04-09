const express = require("express");
const { ProductService } = require("../service/product-service");
const { StatusCodes } = require("http-status-codes");
const ampqlib = require("amqplib");

const productRouter = express.Router();

const productService = new ProductService();

let connection, channel;

const amqpServer = process.env.RABBIT_MQ_URL || "amqp://localhost:5672";
const queue = "PRODUCT_SERVICE_QUEUE";

const publish = async () => {
    console.log("Publishing from product service");
    try {
        //connect to RabbitMQ server
        connection = await ampqlib.connect(amqpServer);
        //Next we create a channel, which is where most of the API for getting things done resides:
        channel = await connection.createChannel();
        //To send, we must declare a queue for us to send to;
        await channel.assertQueue(queue);
    } catch (error) {
        console.log(error);
    }
};

productRouter.post("/create-product", async (req, res, next) => {
    try {
        const createProduct = await productService.createProduct(req.body);
        // send a message to all the services connected to 'order' queue, add the date to differentiate between them
        channel.sendToQueue(
            queue,
            Buffer.from(
                JSON.stringify({
                    ...createProduct,
                    date: new Date(),
                })
            )
        );
        console.log("Create product sent to queue");

        // Lastly, we close the connection and exit:
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);

        return res.status(StatusCodes.CREATED).json(createProduct);
    } catch (error) {
        next(error);
    }
});

publish();

module.exports = { productRouter };
