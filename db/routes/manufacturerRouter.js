const express = require('express');
const { createManufacturer, findManufacturer, findManufacturers, updateManufacturer, deleteManufacturer } = require('../crud/manufacturerCrud');
const router = express.Router();

// Create a new manufacturer
router.post('/', async (req, res) => {
    try {
        const newManufacturer = await createManufacturer(req.body);
        res.status(201).json({ message: 'Manufacturer created successfully', newManufacturer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all manufacturers
router.get('/', async (req, res) => {
    try {
        const manufacturers = await findManufacturers();
        res.status(200).json(manufacturers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a single manufacturer by ID
router.get('/:id', async (req, res) => {
    try {
        const manufacturer = await findManufacturer(req.params.id);
        if (!manufacturer) {
            return res.status(404).json({ error: 'Manufacturer not found' });
        }
        res.status(200).json(manufacturer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a manufacturer by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedManufacturer = await updateManufacturer(req.params.id, req.body);
        if (!updatedManufacturer) {
            return res.status(404).json({ error: 'Manufacturer not found' });
        }
        res.status(200).json({ message: 'Manufacturer updated successfully', updatedManufacturer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a manufacturer by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedManufacturer = await deleteManufacturer(req.params.id);
        if (!deletedManufacturer) {
            return res.status(404).json({ error: 'Manufacturer not found' });
        }
        res.status(200).json({ message: 'Manufacturer deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
