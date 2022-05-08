import React from "react";
import '../App.css';
import emptyCart from './Circle Icon.png';

import { addToCart, setPDP, showPDP } from "../actions";
import { connect } from "react-redux";

class Product extends React.Component {
  render() {
    const clickedProduct = this.props.products.filter(el => el.name === this.props.name);
    const sendToCart = () => {
      const product = clickedProduct[0]
      const amountOfProduct = 1;
      const indexOfPicture = 0;
      let autoChosenAttributes = product.attributes.map(el => {
        return [el.name, el.items[0].displayValue]
      })
      if(product.inStock) {
        this.props.addToCart([product, autoChosenAttributes, amountOfProduct, indexOfPicture])
      } else {
        alert('Sorry, the product is out of stock シシシシ')
      }
    }

    const productClick = () => {
      this.props.setPDP(clickedProduct[0])
      this.props.showPDP(true);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
       });
    }
    return (
      <div className="product" key={this.props.src} onClick={(e) => e.target.className === "product-main-image" ? productClick() : null}>
        <div className="content">
          <div className="product-title">
            {this.props.name}
          </div>
          <div className="price">
            {this.props.price}
          </div>
        </div>
        <div>
          {!clickedProduct[0].inStock ? <div className="out-of-stock">OUT OF STOCK</div> : null}
          <img alt="product image" className="product-main-image" style={!clickedProduct[0].inStock ? {"height": "306px"} : null} src={this.props.src}/>
          <div className="product-cart">
            <img alt="cart button" className="product-cart-image" onClick={() => sendToCart()} src={emptyCart} />
            <div className="hidden-text">Add To Cart With Standard Attributes</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { showPDP, addToCart, setPDP })(Product);