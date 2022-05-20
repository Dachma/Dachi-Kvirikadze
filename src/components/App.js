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
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    // set index for currency
    if(this.props.products && this.props.currencies) {
      const filtered = this.props.currencies.filter(e => e.symbol === this.props.selectedCurrency);
      this.props.setAmountIndex(this.props.currencies.indexOf(filtered[0]));
    }
  }

  render() {
    const showCategory = () => {
      if(this.props.selectedCategory === 'CLOTHES') {
        return (
          <div>
            <title className="category-title">{this.props.selectedCategory}</title>
            <Clothes />
          </div>
        )
      } else if(this.props.selectedCategory === 'TECH') {
        return (
          <div>
            <title className="category-title">{this.props.selectedCategory}</title>
            <Tech />
          </div>
        )
      }
      return (
        <div>
          <title className="category-title">{this.props.selectedCategory}</title>
          <All />
        </div>
      )
    }

    return (
      <div className="page">
        <BrowserRouter>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" exact element={showCategory()} />
              <Route path="cart" element={<Cart />} />
              <Route path="product" element={<PDP />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {setAmountIndex, setPDP})(App);