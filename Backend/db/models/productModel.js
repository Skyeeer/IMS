 const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    contact: contactSchema,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});


const productSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    sku: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    amountInStock: { type: Number, required: true },
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Manufacturer, Product };

