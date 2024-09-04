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

router.get("/products/low-stock", async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ amountInStock: { $lt: 10 } });
        if (lowStockProducts.length === 0) {
            return res.status(200).json({
                message: "No products are low in stock",
                products: []
            });
        }
        res.status(200).json(lowStockProducts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching low stock products" });
    }

});

router.get("/products/total-value-by-manufacturer", async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: "$manufacturer",
                    totalValue: {
                        $sum: { $multiply: ["$price", "$amountInStock"] }
                    }
                }
            }, {
                $lookup: {
                    from: "manufacturers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "manufacturerDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    manufacturer: "$manufacturerDetails.name",
                    totalValue: 1
                }
            }
        ]);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error calculating total value of products by manufacturer" });
    }
})



module.exports = router;