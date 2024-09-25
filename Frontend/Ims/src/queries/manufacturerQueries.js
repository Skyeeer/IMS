import { gql } from "@apollo/client";

export const GET_ALL_MANUFACTURERS = gql`
query getAllManufacturers {
manufacturers {
    id
    name
    country
    website
    description
    address
    contact {
        name
        email
        phone
    }
        
}
}
`

export const GET_MANUFACTURER_DETAILS = gql`
query getManufacturerDetails($id: ID!) {
manufacturer(id: $id) {
    id
    name
    country
    website
    description
    address
    contact {
        name
        email
        phone
    }
        
}
}`