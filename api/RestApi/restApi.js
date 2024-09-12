require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');



function restApi(){
    const app = express();

    const productRouter = require("../../db/routes/productRouter");
    const manufacturerRouter = require("../../db/routes/manufacturerRouter");

    const PORT = 3000;

    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster01.8ffgk.mongodb.net/IMSdb?retryWrites=true&w=majority`)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.error("MongoDB connection error:", error));

    app.use(express.json());
    app.use("/products", productRouter);
    app.use("/manufacturers", manufacturerRouter);


    app.get("/", (req, res) => {
        res.send("Hello World")
    });


    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`)
    })
};
module.exports = {restApi};