import { combineReducers } from "redux";

const categoryReducer = (selectedCategory='ALL', action) => {
  if(action.type === 'CATEGORY_SELECT') {
    return action.payload
  }
  return selectedCategory
}

const currencyReducer = (selectedCurrency=null, action) => {
  if(action.type === 'SET_CURRENCY') {
    return action.payload
  }
  return selectedCurrency
}

const productsReducer = (products=[], action) => {
  if(action.type === 'SET_PRODUCTS') {
    return action.payload
  }
  return products
}

const everyCurrencyReducer = (allCurrencies=null, action) => {
  if(action.type === 'SET_ALL_CURRENCIES') {
    return action.payload
  }
  return allCurrencies
}

const amountIndexReducer = (index=0, action) => {
  if(action.type === 'SET_INDEX') {
    return action.payload
  }
  return index
}

const singleProductReducer = (product=null, action) => {
  if(action.type === 'SET_SINGLE_PRODUCT') {
    return action.payload
  }
  return product
}

const PDPproductReducer = (product=null, action) => {
  if(action.type === 'SET_PDP') {
    return action.payload
  }
  return product
}

const showPDPReducer = (bool=false, action) => {
  if(action.type === 'SHOW_PDP') {
    return action.payload
  }
  return bool
}

const cartReducer = (cart=[], action) => {
  if(action.type === 'ADD_TO_CART') {
    return [...cart, action.payload]
  }
  return cart
}

const totalPriceReducer = (total=0, action) => {
  if(action.type === 'ADD_TO_PRICE') {
    return [...total, action.payload]
  }
  return total
}

export default combineReducers({
  selectedCategory: categoryReducer,
  selectedCurrency: currencyReducer,
  products: productsReducer,
  currencies: everyCurrencyReducer,
  indexForAmount: amountIndexReducer,
  selectedProduct: singleProductReducer,
  PDPproduct: PDPproductReducer,
  showPDP: showPDPReducer,
  cart: cartReducer,
  totalAmount: totalPriceReducer
})