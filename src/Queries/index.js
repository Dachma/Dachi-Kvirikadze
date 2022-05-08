import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  {
    category{
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`

export const CURRENCY_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`