const { Manufacturer } = require("../models/productModel");

// Create and save a new manufacturer
const createManufacturer = async (parent,args) => {
    const newManufacturer = new Manufacturer(args==undefined?parent:args.newManufacturer);
    return newManufacturer.save();
};


// Find a single manufacturer by its ID
const findManufacturer = async (parent,args) => {

    return Manufacturer.findById(args==undefined?parent:args.id);

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
const deleteManufacturer = async (parent,args) => {
    return Manufacturer.findByIdAndDelete(args==undefined?parent:args.id);
};


module.exports = { createManufacturer, findManufacturer, findManufacturers, updateManufacturer, deleteManufacturer };
