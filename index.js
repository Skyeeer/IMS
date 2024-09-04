const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const productRouter = require("./db/routes/productRouter");
const manufacturerRouter = require("./db/routes/manufacturerRouter");

const PORT = process.env.PORT || 3000;
//const url = "mongodb+srv://cluster01.8ffgk.mongodb.net/IMSdb"    

/*mongoose.connect(url, {
user: process.env.DB_USER,
pass: process.env.DB_PASSWORD,
})*/
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster01.8ffgk.mongodb.net/IMSdb?retryWrites=true&w=majority`)
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());
app.use("/products", productRouter);
app.use("/manufacturers", manufacturerRouter);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})