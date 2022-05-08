import React from "react";
import Tech from "./Tech";
import Clothes from "./Clothes";
import PDP from "./PDP";
import Cart from "./Cart";
import Header from "../Header";
import All from "./All";
import '../App.css';
import { connect } from "react-redux";
import { setAmountIndex, setPDP } from "../actions";

class App extends React.Component {
  state = {
    productAmount: this.props.cart
  }
  render() {
    // set index of currency
    if(this.props.products && this.props.currencies) {
      const filtered = this.props.currencies.filter(e => e.symbol === this.props.selectedCurrency);
      this.props.setAmountIndex(this.props.currencies.indexOf(filtered[0]));
    }

    const showCategory = () => {
      if(this.props.selectedCategory === 'CLOTHES') {
        return (
          <div>
            <title className="category">{this.props.selectedCategory}</title>
            <Clothes />
          </div>
        )
      } else if(this.props.selectedCategory === 'TECH') {
        return (
          <div>
            <title className="category">{this.props.selectedCategory}</title>
            <Tech />
          </div>
        )
      } else if(this.props.selectedCategory === 'CART') {
        return <Cart />
      }
      return (
        <div>
          <title className="category">{this.props.selectedCategory}</title>
          <All />
        </div>
      )
    }

    const showSingleProduct = () => {
      if(this.props.selectedProduct) {
        const selected = this.props.products.filter(el => el.name === this.props.selectedProduct);
        this.props.setPDP(selected[0]);
      }
      if(this.props.PDPproduct) {
        return <PDP />
      }
    }

    return (
      <div className="page">
        <Header />
        <div className="content">
          {!this.props.showPDP ? showCategory() : showSingleProduct()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {setAmountIndex, setPDP})(App);