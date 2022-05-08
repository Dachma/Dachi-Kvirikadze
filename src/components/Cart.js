import React from "react";
import './Cart.css';
import { connect } from "react-redux";

class Cart extends React.Component {
  render() {

    const showTotal = () => {
      let quantity = 0;
      let total = 0;
      this.props.cart.map(el => {
        total = total + el[0].prices[this.props.indexForAmount].amount * el[2];
        quantity += el[2]
      })
      return (
        <div className="total">
          <div className="tax-qty">
            <div>Tax 21%: {this.props.selectedCurrency}{(total * 21 / 100).toFixed(2)}</div>
            <div>Qty: {quantity}</div>
          </div>
          <div className="total-amount">Total: {this.props.selectedCurrency}{total.toFixed(2)}</div> 
        </div>
      )
    }

    const showProducts = () => {
      // increase/decrease quantity of product
      const plusMinus = (action) => {
        return action, this.forceUpdate();
      };
      
      return this.props.cart.map((el, index) => {
        // change photos
        const slide = (act) => {
          if(el[3] >= el[0].gallery.length) {
            el[3] = 0;
          }
          if(el[3] < 0) {
            el[3] = el[0].gallery.length - 1;
          }
          return act, this.forceUpdate();
        }

        const renderImage = () => {
          return (
            <div>
              <img className="cart-prod-photo" src={el[0].gallery[el[3]]} />
              <div className="slide-pic">
                <div onClick={() => slide(el[3]--)} className="prev-photo">
                  <div className="prev-rect">&lt;</div>
                </div>
                <div onClick={() => slide(el[3]++)} className="next-photo">
                  <div className="next-rect">&gt;</div>
                </div>
              </div>
            </div>
          )
        }
        
        let pricesSum = 0;
        pricesSum = pricesSum + el[0].prices[this.props.indexForAmount].amount;

        return (
        <div>
          <div className="cart-product">
            <div className="cart-product-leftside">
              <div className="cart-incr-decr">
                <div onClick={() => plusMinus(el[2]++)} className="cart-plus-square">
                  +
                </div>
                <label className="cart-amount-label">{el[2]}</label>
                <div onClick={() => plusMinus(el[2] > 1 ? el[2]-- : this.props.cart.splice(index, 1))} className="cart-minus-square">
                  -
                </div>
              </div>
              <div className="cart-product-info">
                <div className="cart-product-title">
                  {el[0] ? el[0].brand : null}
                  <br/>
                  {el[0]? el[0].name : null}
                </div>
                <div className="cart-product-price">{this.props.selectedCurrency}{el[0].prices[this.props.indexForAmount].amount}</div>
                <div className="cart-product-attributes">
                  {el[0].attributes.map((e, index) => {
                    let chosenAttributeValues = el[1].map(chosenAttributes => {
                      return chosenAttributes[1]
                    });
                    return (
                      <div>
                        <div className="cart-product-attribute-name">{`${el[0].attributes[index].name}:`}</div>
                        <div className="cart-attribute-buttons">
                          {e.items.map((element, indx) => {
                            return (
                              <div>
                                {e.type === 'swatch' ? <button 
                                  disabled key={element.id} 
                                  className={`${chosenAttributeValues.includes(element.displayValue) ? 'selected-swatch-button' : 'attr-button'}`}
                                  style={{'backgroundColor': element.displayValue, 'width': '32px', "height": '32px'}}
                                ></button> :
                                <div>
                                  <button 
                                  disabled key={element.id} 
                                  className={`${chosenAttributeValues.includes(element.displayValue) && chosenAttributeValues[index] === e.items[indx].displayValue ? 'selected-attr-button' : 'attr-button'}`}
                                >
                                    <div>{element.displayValue}</div>
                                  </button>
                                </div>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {renderImage()}
          </div>
          <hr className="prod-hr"/>
        </div>
        )
      })
    }

    return (
      <div className="cart-page">
        <div className="cart-title">CART</div>
        <hr className="hr" />
        <div className="cart-products">
          {showProducts()}
        </div>
        <div className="order">
          {showTotal()}
          <button onClick={() => alert('㋛㋛㋛㋛ ORDERED ㋛㋛㋛㋛')} className="order-button">ORDER</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Cart);