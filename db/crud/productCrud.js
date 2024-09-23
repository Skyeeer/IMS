const { Product } = require("../models/productModel");

// Create and save a new product
const createProduct = async (parent,args) => {
    const newProduct = new Product(args==undefined?parent:args.newProduct);
    return await newProduct.save();
};

// Find a single product by its ID, including manufacturer details
const findProduct = async (parent,args) => {

    return await Product.findById(args==undefined?parent:args.id).populate('manufacturer');
    
};

// Find all products, including manufacturer details
const findProducts = async () => {
    return await Product.find().populate('manufacturer');
};

//Find products with less than a certain amount in stock
const findLowStockProducts = async (parent,args) => {

 return await Product.find({ amountInStock: { $lt: args==undefined?parent:args.threshold } }).populate('manufacturer');
    
};

//Find total value of of products by manufacturer
const findTotalValueByManufacturer = async () => {
    return await Product.aggregate([
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
const updateProduct = async (parent, args) => {
    return await Product.findByIdAndUpdate(typeof parent==String?parent:args.id, typeof parent==String?args:args.product, { new: true }).populate('manufacturer');
};

// Delete a product by its ID
const deleteProduct = async (parent,args) => {
    return await Product.findByIdAndDelete(args==undefined?parent:args.id);
};

// Calculate the total value of all products in stock
const calculateTotalStockValue = async () => {

    const products = await Product.find();
    return {totalValue:products.reduce((acc, product) => acc + product.price * product.amountInStock, 0)}


};

module.exports = { createProduct, findProduct, findProducts, updateProduct, deleteProduct, findLowStockProducts, findTotalValueByManufacturer, calculateTotalStockValue };