const { createProduct, findProduct, findProducts, updateProduct, deleteProduct, findLowStockProducts, findTotalValueByManufacturer, calculateTotalStockValue } = require('../../db/crud/productCrud');
const { createManufacturer, findManufacturer, findManufacturers, updateManufacturer, deleteManufacturer }= require('../../db/crud/manufacturerCrud');
const resolvers = {
    Query:{
        findProducts,
        findProduct,
        findManufacturers,
        findLowStockProducts,
        findTotalValueByManufacturer,
        findManufacturer,
        calculateTotalStockValue
        
    },
    Mutation:{
        deleteProduct,
        createProduct,
        updateProduct
    }

}

module.exports = {resolvers};