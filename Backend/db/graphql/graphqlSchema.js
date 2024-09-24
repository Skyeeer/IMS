
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const { GraphQLInputObjectType } = require('graphql');
const { createProduct, findProduct, findProducts, findProductsByManufacturer, updateProduct, deleteProduct, findLowStockProducts, findTotalValueByManufacturer, calculateTotalStockValue } = require('../crud/productCrud');
const { createManufacturer, findManufacturer, findManufacturers, updateManufacturer, deleteManufacturer } = require('../crud/manufacturerCrud');
const { Manufacturer } = require('../models/productModel');


const ManufacturerType = new GraphQLObjectType({
  name: 'Manufacturer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: {
      type: new GraphQLObjectType({
        name: 'ManufacturerContactInput',
        fields: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          phone: { type: GraphQLString },
        }
      })
    }
  })
});

const ManufacturerContactInputType = new GraphQLInputObjectType({
  name: 'ManufacturerContact',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  }
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    amountInStock: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    manufacturer: { type: ManufacturerType }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    totalValue: {
      type: GraphQLFloat,
      resolve: async () => {
        return await calculateTotalStockValue();
      }
    },
    lowStockProducts: {
      type: new GraphQLList(ProductType),
      args: { limit: { type: GraphQLInt } },
      resolve: async (_, { limit }) => {
        return await findLowStockProducts(limit);
      }
    },
    totalValueByManufacturer: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'ManufacturerTotalValue',
        fields: {
          manufacturer: { type: GraphQLString },
          totalValue: { type: GraphQLFloat }
        }
      })),
      resolve: async () => {
        return await findTotalValueByManufacturer();
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        return await findProduct(id);
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => {
        return await findProducts();
      }
    },
    productsByManufacturer: {
      type: new GraphQLList(ProductType),
      args: {
        manufacturerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (_, { manufacturerId }) => {
        try {
          // Проверка, применен ли фильтр
          console.log("Filtering products by manufacturerId:", manufacturerId);
          return await findProductsByManufacturer({ manufacturer: manufacturerId });
        } catch (error) {
          throw new Error(`Error fetching products by manufacturer: ${error.message}`);
        }
      }
    },
    manufacturers: {
      type: new GraphQLList(ManufacturerType),
      resolve: async () => {
        return await findManufacturers();
      }
    },
    manufacturer: {
      type: ManufacturerType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        return await findManufacturer(id);
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        sku: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        amountInStock: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        manufacturer: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (_, { name, sku, category, description, amountInStock, price, manufacturer }) => {
        try {
          const manufacturerExists = await Manufacturer.findById(manufacturer);
          if (!manufacturerExists) throw new Error('Manufacturer not found');
          return await createProduct({ name, sku, category, description, amountInStock, price, manufacturer });
        } catch (error) {
          throw new Error(`Error creating product: ${error.message}`);
        }
      }
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        manufacturer: { type: GraphQLID }
      },
      resolve: async (_, { id, ...updateData }) => {
        const updatedProduct = await updateProduct(id, updateData);
        if (!updatedProduct) throw new Error('Product not found');
        return updatedProduct;
      }
    },
    deleteProduct: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        const deletedProduct = await deleteProduct(id);
        if (!deletedProduct) throw new Error('Product not found');
        return 'Product deleted successfully';
      }
    },
    createManufacturer: {
      type: ManufacturerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        description: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: ManufacturerContactInputType }
      },
      resolve: async (_, { name, country, website, description, address, contact }) => {
        return await createManufacturer({ name, country, website, description, address, contact });
      }
    },
    updateManufacturer: {
      type: ManufacturerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        website: { type: GraphQLString },
        description: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: ManufacturerContactInputType }
      },
      resolve: async (_, { id, ...updateData }) => {
        const updatedManufacturer = await updateManufacturer(id, updateData);
        if (!updatedManufacturer) throw new Error('Manufacturer not found');
        return updatedManufacturer;
      }
    },
    deleteManufacturer: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        const deletedManufacturer = await deleteManufacturer(id);
        if (!deletedManufacturer) throw new Error('Manufacturer not found');
        return 'Manufacturer deleted successfully';
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
