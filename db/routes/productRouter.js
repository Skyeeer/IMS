const { createProduct, findProduct, findProducts, updateProduct, deleteProduct, findLowStockProducts, findTotalValueByManufacturer, calculateTotalStockValue } = require('../crud/productCrud');
const express = require('express');
const { Manufacturer } = require("../models/productModel");
const router = express.Router();

//Get total value of all products in stock
router.get('/total-value', async (req, res) => {
    try {
        const totalValue = await calculateTotalStockValue();
        res.status(200).json({ totalValue });
    } catch (err) {
        res.status(500).json({ message: 'Error calculating total value of stock' });
    }
});

// Get low stock products
router.get('/low-stock', async (req, res) => {
    try {
        const lowStockProducts = await findLowStockProducts(10);
        if (lowStockProducts.length === 0) {
            return res.status(200).json({ message: 'No products are low in stock', products: [] });
        }
        res.status(200).json(lowStockProducts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching low stock products' });
    }
});

//Get total value by manufacturer
router.get('/total-value-by-manufacturer', async (req, res) => {
    try {
        const result = await findTotalValueByManufacturer();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error calculating total value by manufacturer' });
    }
});

// Fetch products with less than 5 in stock including manufacturer details
router.get('/critical-stock', async (req, res) => {
    try {
        const products = await findLowStockProducts(5);
        const criticalProducts = products.map(product => ({
            productName: product.name,
            manufacturer: {
                name: product.manufacturer.name,
                contact: {
                    name: product.manufacturer.contact.name,
                    phone: product.manufacturer.contact.phone,
                    email: product.manufacturer.contact.email
                }
            }
        }));
        res.status(200).json(criticalProducts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching critical low stock products' });
    }
});

// Alla routes med ID får inte läggas till ovanför denna kommentar


// Create a new product
router.post('/', async (req, res) => {
    try {
        const { manufacturer } = req.body;

        // checking if manufacturer exists
        const manufacturerExists = await Manufacturer.findById(manufacturer);
        if (!manufacturerExists) {
            return res.status(404).json({ error: 'Manufacturer not found' });
        }

        const newProduct = await createProduct(req.body);
        res.status(201).json({ message: 'Product created successfully', newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await findProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await findProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;