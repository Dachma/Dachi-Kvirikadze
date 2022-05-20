import React from "react";
import '../App.css';
import emptyCart from './Circle Icon.png';

import { addToCart, setPDP, showPDP } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        console.log('Sorry, the product is out of stock シシシシ')
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

    const checkStock = () => {
      if(!clickedProduct[0].inStock) {
        return (
          <Link to='/product' style={{ textDecoration: 'none' }}>
            <div className="product" onClick={(e) => e.target.className !== "product-cart-image" ? productClick() : null}>
              <div className="content">
                <div className="product-title-out-stock">
                  {this.props.brand} {this.props.name}
                </div>
                <div className="price-out-stock">
                  {this.props.price}
                </div>
              </div>
              <div className="stock-container">
                <div className="out-of-stock">OUT OF STOCK</div>
                <img alt="product" className="product-main-image" src={this.props.src}/>
              </div>
            </div>
          </Link>
        )
      } else {
        return (
          <Link to='/product' style={{ textDecoration: 'none' }}>
            <div className="product" onClick={(e) => e.target.className !== "product-cart-image" ? productClick() : null}>
              <div className="content">
                <div className="product-title">
                  {this.props.brand} {this.props.name}
                </div>
                <div className="price">
                  {this.props.price}
                </div>
              </div>
              <div className="cart-image-container">
                <img alt="product" className="product-main-image" src={this.props.src}/>
                <Link to='#' style={{ textDecoration: 'none' }}>
                  <div className="product-cart">
                    <img alt="cart button" className="product-cart-image" onClick={() => sendToCart()} src={emptyCart} />
                    <div className="hidden-text">Add To Cart With Default Attributes</div>
                  </div>
                </Link>
              </div>
            </div>
          </Link>
        )
      }
    }
    
    return (
      <div>
        {checkStock()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { showPDP, addToCart, setPDP })(Product);