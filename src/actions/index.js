export const selectCategory = (category) => {
  return {
    type: 'CATEGORY_SELECT',
    payload: category
  }
}

export const setCurrency = (currency) => {
  return {
    type: 'SET_CURRENCY',
    payload: currency
  }
}

export const setProducts = (products) => {
  return {
    type: 'SET_PRODUCTS',
    payload: products
  }
}

export const setAllCurrencies = (everyCurrency) => {
  return {
    type: 'SET_ALL_CURRENCIES',
    payload: everyCurrency
  }
}

export const setAmountIndex = (index) => {
  return {
    type: 'SET_INDEX',
    payload: index
  }
}

export const setPDP = (product) => {
  return {
    type: 'SET_PDP',
    payload: product
  }
}

export const showPDP = (bool) => {
  return {
    type: 'SHOW_PDP',
    payload: bool
  }
}

export const addToCart = (prod) => {
  return {
    type: 'ADD_TO_CART',
    payload: prod
  }
}

export const setTotalPrice = (amount) => {
  return {
    type: 'ADD_TO_PRICE',
    payload: amount
  }
}