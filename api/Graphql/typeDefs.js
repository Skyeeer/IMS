const typeDefs = `#graphql
    type contact{
        name: String,
        email:String,
        phone:String
    }
    type manufacturer{

        name: String,
        country: String,
        website: String,
        description: String,
        address: String,
        contact: contact
    }
    type product {
        name:String,
        sku: String,
        description: String,
        price: Float,
        category: String,
        manufacturer: manufacturer,
        amountInStock: Int
    }
    type totalValueByManufacturer {
        totalValue: Float,
        manufacturer: String
    }
    type totalValue{
        totalValue: Float
    }

    type Query{
        findManufacturers: [manufacturer]
        findManufacturer(id:ID): manufacturer
        findProducts: [product]
        findProduct(id:ID): product
        findLowStockProducts(threshold:Int):[product]
        findTotalValueByManufacturer:[totalValueByManufacturer]
        calculateTotalStockValue: totalValue
    }
   
`

module.exports = {typeDefs};