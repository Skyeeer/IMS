const { createProduct, findProduct, findProducts, updateProduct, deleteProduct } = require('../crud/productCrud');
const express = require('express');
const { Manufacturer } = require("../models/productModel");
const router = express.Router();

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
