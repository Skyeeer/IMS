const express = require('express');
const { Manufacturer, Product } = require('../db/models/productModel');
const router = express.Router();

router.get("/manufacturers", async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.status(200).json(manufacturers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to retrieve manufacturers");
    }
});

router.get("/products/total-value", async (req, res) => {
    try {
        const products = await Product.find();

        const totalValue = products.reduce((acc, product) => {
            return acc + product.price * product.amountInStock;
        }, 0);
        res.status(200).json({ totalValue });
    } catch (err) {
        res.status(500).json({ message: "Error calculating total value of products in stock" });
    }
});



module.exports = router;