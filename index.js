require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = 3000;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster01.8ffgk.mongodb.net/IMSdb?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.error("MongoDB connection error", err));


app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})