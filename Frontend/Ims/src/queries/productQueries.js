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
export const GET_PRODUCT_BY_MANUFACTURER = gql`
query getProductsByManufacturer($manufacturerId: ID!) {
    products(manufacturerId: $manufacturerId) {
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
