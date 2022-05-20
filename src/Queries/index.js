import { gql } from "@apollo/client";


export const PRODUCTS_QUERY = gql `
query Query($input: String!) {
  category(input:{title: $input}){
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

export const SINGLE_PRODUCT_QUERY = gql `
query Query($id: String!) {
  product(id: $id) {
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
      amount
    }
    brand
  }
}
`

export const CATEGORIES_QUERY = gql`
  {
    categories {
      name
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