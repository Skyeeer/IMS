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

    type Mutation{
        deleteProduct(id:ID!):product
        createProduct(newProduct:createProduct!):product
        updateProduct(id:ID!,updates:updateProduct!):product
    }
    input createProduct{
        name:String!,
        sku: String!,
        description: String!,
        price: Float!,
        category: String!,
        manufacturer: ID!,
        amountInStock: Int!
    }
    input updateProduct{
        name:String,
        sku: String,
        description: String,
        price: Float,
        category: String,
        manufacturer: ID,
        amountInStock: Int
    }
   
`

module.exports = {typeDefs};