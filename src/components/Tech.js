import React from "react";
import Product from "./Product";
import { connect } from "react-redux";
import { PRODUCTS_QUERY } from "../Queries";
import { client } from "..";

class Tech extends React.Component {
  state = {
    products: null
  }
  componentDidMount() {
    const fetchProducts = async () => {
      const response = await client.query({
        query: PRODUCTS_QUERY, variables:{input: "tech"}
      })
      this.setState({ products:response.data.category.products })
    }
    fetchProducts();
  }
  render() {
    const showTech = () => {
      if(this.state.products) {
        return this.state.products.map(el => {
            return (
              <Product
                key={el.name}
                name={el.name}
                brand={el.brand}
                price={`${this.props.selectedCurrency}${el.prices[this.props.indexForAmount].amount}`}
                src={el.gallery[0]}
              />
            )
        })
      }
      return null
    }
    return (
      <div className="page">
        {showTech()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Tech);