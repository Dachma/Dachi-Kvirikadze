import React from "react";
import Product from "./Product";
import { connect } from "react-redux";

class Clothes extends React.Component {
  render() {
    const showClothes = () => {
      return this.props.products.map((el, index) => {
        if(el.category === "clothes") {
          return (
            <Product
              key={el.name}
              name={el.name}
              price={`${this.props.selectedCurrency}${el.prices[this.props.indexForAmount].amount}`}
              src={el.gallery[0]}
            />
          )
        }
      })
    }
    return (
      <div className="page">
        {showClothes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Clothes);