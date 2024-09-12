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
        price: Int,
        category: String,
        manufacturer: manufacturer,
        amountInStock: Int
    }
    type Query{
        findManufacturers: [manufacturer]
        findProducts: [product]
        findProduct(id:ID): product
        findLowStockProducts(threshold:Int):[product]
    }
   
`

module.exports = {typeDefs};