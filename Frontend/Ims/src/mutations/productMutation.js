import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
    mutation createProduct(
    $name: String!, 
    $sku: String!,
    $price: String!,
    $description: String!,
    $category: String!,
    $amountInStock: Int!,
    $manufacturer: ID!,
  ) {
    createProduct(
      name: $name,
      sku: $sku,
      price: $price,
      description: $description,
      manufacturer: $manufacturer,
      amountInStock: $amountInStock,
      category: $category,
    ) {
      id
      name
      category
      price
      description
      amountInStock
      manufacturer {
        name
      }
    }
  }
`