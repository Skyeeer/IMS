const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;
const url = ""//LÄGG TILL mongoDB url
// mongoose.connect(url, {
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASSWORD,
// });

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})