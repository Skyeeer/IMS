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
        deleteManufacturer(id:ID!):manufacturer
        createProduct(newProduct:createProduct!):product
        createManufacturer(newManufacturer:createManufacturer!):manufacturer
        updateProductql(id:ID!,updates:updateProductql!):product
        updateManufacturerql(id:ID!,updates:updateManufacturerql!):manufacturer
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
    input createManufacturer{

        name: String!,
        country: String!,
        website: String!,
        description: String!,
        address: String!,
        contact: createContact!
    }
    input createContact{
        name: String,
        email:String,
        phone:String
    }
    input updateProductql{
        name:String,
        sku: String,
        description: String,
        price: Float,
        category: String,
        manufacturer: ID,
        amountInStock: Int
    }
    input updateManufacturerql{
        name: String,
        country: String,
        website: String,
        description: String,
        address: String,
        contact: createContact
    }
   
`

module.exports = {typeDefs};