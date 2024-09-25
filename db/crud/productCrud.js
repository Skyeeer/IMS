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

//Find products with less than a certain amount in stock
const findLowStockProducts = async (threshold) => {
    return Product.find({ amountInStock: { $lt: threshold } }).populate('manufacturer');
};

//Find total value of of products by manufacturer
const findTotalValueByManufacturer = async () => {
    return Product.aggregate([
        {
            $group: {
                _id: '$manufacturer',
                totalValue: {
                    $sum: { $multiply: ['$price', '$amountInStock'] }
                }
            }
        },
        {
            $lookup: {
                from: 'manufacturers',
                localField: '_id',
                foreignField: '_id',
                as: 'manufacturerDetails'
            }
        },
        {
            $unwind: '$manufacturerDetails'
        },
        {
            $project: {
                manufacturer: '$manufacturerDetails.name',  // Show the manufacturer name first
                totalValue: 1,  // Show the total value second
                _id: 1  // Keep the ObjectId (manufacturer's _id) as the last field
            }
        }
    ]);

};

// Update an existing product by its ID 
const updateProduct = async (id, product) => {
    return Product.findByIdAndUpdate(id, product, { new: true }).populate('manufacturer');
};

// Delete a product by its ID
const deleteProduct = async (id) => {
    return Product.findByIdAndDelete(id);
};

// Calculate the total value of all products in stock
const calculateTotalStockValue = async () => {
    const products = await Product.find();
    return products.reduce((acc, product) => acc + product.price * product.amountInStock, 0);
};

module.exports = { createProduct, findProduct, findProducts, updateProduct, deleteProduct, findLowStockProducts, findTotalValueByManufacturer, calculateTotalStockValue };
