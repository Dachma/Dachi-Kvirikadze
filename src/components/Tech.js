import React from "react";
import Product from "./Product";
import { connect } from "react-redux";

class Tech extends React.Component {
  render() {
    const showTech = () => {
      return this.props.products.map(el => {
        if(el.category === "tech") {
          return (
            <Product
              key={el.name}
              name={el.name}
              price={`${this.props.selectedCurrency}${el.prices[this.props.indexForAmount].amount}`}
              src={el.gallery[0]}
            />
          )
        }
        return null
      })
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