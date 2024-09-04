const { Manufacturer } = require("../models/productModel");

// Create and save a new manufacturer
const createManufacturer = async (manufacturer) => {
    const newManufacturer = new Manufacturer(manufacturer);
    return newManufacturer.save();
};

// Find a single manufacturer by its ID
const findManufacturer = async (id) => {
    return Manufacturer.findById(id);
};

// Find all manufacturers
const findManufacturers = async () => {
    return Manufacturer.find();
};

// Update an existing manufacturer by its ID
const updateManufacturer = async (id, manufacturer) => {
    return Manufacturer.findByIdAndUpdate(id, manufacturer, { new: true });
};

// Delete a manufacturer by its ID
const deleteManufacturer = async (id) => {
    return Manufacturer.findByIdAndDelete(id);
};

module.exports = { createManufacturer, findManufacturer, findManufacturers, updateManufacturer, deleteManufacturer };
