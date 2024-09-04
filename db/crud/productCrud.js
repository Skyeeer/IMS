const { Product } = require("../models/productModel");

// Create and save a new product
const createProduct = async (product) => {
    const newProduct = new Product(product);
    return newProduct.save();
};

// Find a single product by its ID, including manufacturer details
const findProduct = async (id) => {
    return Product.findById(id).populate('manufacturer');
};

// Find all products, including manufacturer details
const findProducts = async () => {
    return Product.find().populate('manufacturer');
};

// Update an existing product by its ID 
const updateProduct = async (id, product) => {
    return Product.findByIdAndUpdate(id, product, { new: true }).populate('manufacturer');
};

// Delete a product by its ID
const deleteProduct = async (id) => {
    return Product.findByIdAndDelete(id);
};

module.exports = {createProduct, findProduct, findProducts, updateProduct, deleteProduct };