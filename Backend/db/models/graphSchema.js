const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const { createProduct, findProducts, findProduct, updateProduct, deleteProduct, findLowStockProducts, calculateTotalStockValue, findTotalValueByManufacturer } = require('../crud/productCrud');
const { createManufacturer, findManufacturers, findManufacturer, updateManufacturer, deleteManufacturer } = require('../crud/manufacturerCrud');

//Manufacturer Type
const ManufacturerType = new GraphQLObjectType({
    name: 'Manufacturer',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        website: { type: GraphQLString },
        description: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: {
            type: new GraphQLObjectType({
                name: 'Contact',
                fields: () => ({
                    name: { type: GraphQLString },
                    email: { type: GraphQLString },
                    phone: { type: GraphQLString }
                })
            })
        }
    })

});


//Product Type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
        manufacturer: {
            type: ManufacturerType,
            resolve(parent, args) {
                return findManufacturer(parent.manufacturer);
            }
        }
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //Get single manufacturer
        manufacturer: {
            type: ManufacturerType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return findManufacturer(args._id);
            }
        },

        //Get all manufacturers
        manufacturers: {
            type: new GraphQLList(ManufacturerType),
            resolve() {
                return findManufacturers();
            }
        },

        //Get single product
        product: {
            type: ProductType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return findProduct(args._id);
            }
        },

        //Get all products
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return findProducts();
            }
        },

        //Get low stock products
        lowStockProducts: {
            type: new GraphQLList(ProductType),
            args: { threshold: { type: GraphQLInt } },
            resolve(parent, args) {
                return findLowStockProducts(args.threshold);
            }
        },

        //Get total stock value of all products
        totalStockValue: {
            type: GraphQLFloat,
            resolve() {
                return calculateTotalStockValue();
            }
        },

        //Get total stock value by manufacturer
        totalStockValueByManufacturer: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'TotalStockByManufacturer',
                fields: {
                    manufacturer: { type: ManufacturerType },
                    totalValue: { type: GraphQLFloat }
                }
            })),
            resolve() {
                return findTotalValueByManufacturer();
            }
        },

        // Get critically low Stock with manufacturer details
        criticalStockProducts: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'CriticalStockProduct',
                fields: {
                    name: { type: GraphQLString },
                    manufacturer: {
                        type: new GraphQLObjectType({
                            name: 'ManufacturerDetails',
                            fields: {
                                name: { type: GraphQLString },
                                contact: {
                                    type: new GraphQLObjectType({
                                        name: 'ContactDetails',
                                        fields: {
                                            name: { type: GraphQLString },
                                            phone: { type: GraphQLString },
                                            email: { type: GraphQLString }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })),
            resolve: async () => {
                const products = await findLowStockProducts(5);
                return products.map(product => ({
                    name: product.name,
                    manufacturer: {
                        name: product.manufacturer.name,
                        contact: {
                            name: product.manufacturer.contact.name,
                            phone: product.manufacturer.contact.phone,
                            email: product.manufacturer.contact.email
                        }
                    }
                }));
            }
        }

    }

});


//Mutations (Create, Update, Delete)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Create Manufacturer
        createManufacturer: {
            type: ManufacturerType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                country: { type: GraphQLNonNull(GraphQLString) },
                website: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
                contact: {
                    type: new GraphQLInputObjectType({
                        name: 'ContactInput',
                        fields: {
                            name: { type: GraphQLNonNull(GraphQLString) },
                            email: { type: GraphQLNonNull(GraphQLString) },
                            phone: { type: GraphQLNonNull(GraphQLString) }
                        }
                    })
                }
            },
            resolve(parent, args) {
                const manufacturer = {
                    name: args.name,
                    country: args.country,
                    website: args.website,
                    description: args.description,
                    address: args.address,
                    contact: args.contact
                };
                return createManufacturer(manufacturer);
            }
        },

        // Update a manufacturer
        updateManufacturer: {
            type: ManufacturerType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                country: { type: GraphQLString },
                website: { type: GraphQLString },
                description: { type: GraphQLString },
                address: { type: GraphQLString },
                contact: {
                    type: new GraphQLInputObjectType({
                        name: 'ContactInputUpdate',
                        fields: {
                            name: { type: GraphQLString },
                            email: { type: GraphQLString },
                            phone: { type: GraphQLString }
                        }
                    })
                }
            },
            resolve(parent, args) {
                const updatedManufacturer = {
                    name: args.name,
                    country: args.country,
                    website: args.website,
                    description: args.description,
                    address: args.address,
                    contact: args.contact
                };
                return updateManufacturer(args._id, updatedManufacturer);
            }
        },

        // Delete Manufacturer
        deleteManufacturer: {
            type: ManufacturerType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return deleteManufacturer(args._id);
            }
        },

        //Create Product
        createProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                sku: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLNonNull(GraphQLFloat) },
                category: { type: GraphQLNonNull(GraphQLString) },
                manufacturer: { type: GraphQLNonNull(GraphQLID) },
                amountInStock: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const product = {
                    name: args.name,
                    sku: args.sku,
                    description: args.description,
                    price: args.price,
                    category: args.category,
                    manufacturer: args.manufacturer,
                    amountInStock: args.amountInStock
                };
                return createProduct(product);
            }
        },

        // Update a product
        updateProduct: {
            type: ProductType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                sku: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLFloat },
                category: { type: GraphQLString },
                manufacturer: { type: GraphQLID },
                amountInStock: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const updatedProduct = {
                    name: args.name,
                    sku: args.sku,
                    description: args.description,
                    price: args.price,
                    category: args.category,
                    manufacturer: args.manufacturer,
                    amountInStock: args.amountInStock
                };
                return updateProduct(args._id, updatedProduct);
            }
        },

        // Delete a product
        deleteProduct: {
            type: ProductType,
            args: { _id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return deleteProduct(args._id);
            }
        }

    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});