import React from "react";
import { PRODUCTS_QUERY } from '../Queries';
import { client } from "..";
import Product from "./Product";
import { connect } from "react-redux";
import { setProducts, setAmountIndex } from "../actions";

class All extends React.Component {
  componentDidMount() {
    const fetchProducts = async () => {
      const response = await client.query({
        query: PRODUCTS_QUERY
      })
      this.props.setProducts(response.data.category.products);
    }
    fetchProducts();
  }

  render() {
    const renderProducts = () => {
      if(this.props.products && this.props.currencies) {
        return this.props.products.map(el => {
          return (
            <Product
              key={el.name}
              name={el.name}
              price={`${this.props.selectedCurrency}${el.prices[this.props.indexForAmount].amount}`}
              src={el.gallery[0]}
            />
          )
        })
      }
    }
    return (
      <div className="page">
        {renderProducts()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { setProducts, setAmountIndex } )(All);