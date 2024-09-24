import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
query getAllProducts {
  products {
    id
    name
    category
    sku
    price
    description
    manufacturer {
      name
    }
    amountInStock
  }
}
  
`;

export const GET_PRODUCT_BY_ID = gql`
query getProductById($id: ID!) {
product(id: $id) {
    id
    name
    category
    sku
    description
    price
    manufacturer{
    name
    }
    amountInStock
}
}
    `;
export const GET_PRODUCTS_BY_MANUFACTURER = gql`
query getProductsByManufacturer($manufacturerId: ID!) {
    productsByManufacturer(manufacturerId: $manufacturerId) {
    id
    name
    category
    sku
    description
    price
    manufacturer{
    name
    }
    amountInStock
    }
}
`;

export const GET_LOW_STOCK_PRODUCTS = gql`
  query lowStockProducts($limit: Int!) {
    lowStockProducts(limit: $limit) {
      id
      name
      category
      sku
      description
      price
      amountInStock
      manufacturer {
        name
      }
    }
  }
`;
