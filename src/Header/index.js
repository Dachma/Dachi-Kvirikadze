import React from "react";

import './header.css';
import './minicart.css';
import cart from './Empty Cart.jpg';
import logo from './a-logo.png';

import { selectCategory, setCurrency, setAllCurrencies, setPDP, showPDP, setTotalPrice } from "../actions";
import { connect } from "react-redux";

import { CURRENCY_QUERY, CATEGORIES_QUERY } from "../Queries";
import { client } from "..";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {
    categories: [],
    minicartOpened: false,
    currencyOpened: false,
    totalPrice: 0
  }
  cartRef = React.createRef();
  currencyRef = React.createRef();
  minicartContentRef = React.createRef();
  
  removeGray = () => {
    [...document.images].map(el => {
      return el.classList.remove('minicart-opened-image');
    })
  }

  componentDidMount() {

    document.body.addEventListener('click', (e) => {
      const checkSide = () => {
        const clickTargetWidth = e.target.offsetWidth;
        const xCoordInClickTarget = e.clientX - e.target.getBoundingClientRect().left;
        if (clickTargetWidth / 2 > xCoordInClickTarget) {
          this.setState({ minicartOpened: false, currencyOpened: false })
          document.body.style.background = "white";
          this.removeGray()
        }
      }

      if(this.cartRef.current !== null && this.cartRef.current.contains(e.target)) {
        this.setState({ currencyOpened: false })
      } else if(this.currencyRef.current !== null && this.currencyRef.current.contains(e.target)) {
        this.setState({ minicartOpened: false })
        document.body.style.background = "white";
        this.removeGray()
      } else {
        checkSide();
      }
    })

    const fetchCategories = async () => {
      const test = await client.query({
        query: CATEGORIES_QUERY
      })
      this.setState({ categories: test.data.categories });
    }
    fetchCategories();

    const fetchCurrencies = async () => {
      const response = await client.query({
        query: CURRENCY_QUERY
      })
      const CURRENCIES = response.data.currencies;
      this.props.setAllCurrencies(CURRENCIES)
      this.props.setCurrency(CURRENCIES[0].symbol)
    }
    fetchCurrencies();
  }

  render() {
    const showTotal = () => {
      let total = 0;
      this.props.cart.map(el => {
        total = total + el[0].prices[this.props.indexForAmount].amount * el[2]
        return total
      })
      return <div className="total-numb">{this.props.selectedCurrency}{total.toFixed(2)}</div>
    }

    const renderCurrencies = () => {
      if(this.props.currencies) {
        let style = this.state.currencyOpened ? "flex" : "none";
        return (
          <div className="dropdown">
            <button ref={this.currencyRef} onClick={openCurrencies} className="currency">{this.props.selectedCurrency}</button>
            <div className="dropdown-content" style={{"display": `${style}`}}>
              {this.props.currencies.map(el => {
                return <div key={el.symbol} className="currency-sign" onClick={() => this.props.setCurrency(el.symbol)}>{el.symbol} {el.label}</div>
              })}
            </div>
          </div>
        )
      }
    }

    const renderProducts = () => {
      if(this.props.cart[0]) {
        return this.props.cart.map((el, index) => {
          return (
          <div key={el[0].name} className="product-in-minicart">
            <div className="minicart-product-leftside">
              <div className="incr-decr">
                <div onClick={() => el[2]++} className="plus-square">
                  +
                </div>
                <label className="amount-label">{el[2]}</label>
                <div onClick={() => el[2] > 1 ? el[2]-- : this.props.cart.splice(index, 1)} className="minus-square">
                  -
                </div>
              </div>
              <div className="minicart-product-info">
                <div className="minicart-product-title">
                  {el[0] ? el[0].brand : null}
                  <br/>
                  {el[0]? el[0].name : null}
                </div>
                <div className="minicart-product-price">{this.props.selectedCurrency}{el[0].prices[this.props.indexForAmount].amount}</div>
                <div className="minicart-product-attributes">
                  {el[0].attributes.map((e, index) => {
                    let chosenAttributeValues = el[1].map(chosenAttributes => {
                      return chosenAttributes[1]
                    });
                    return (
                      <div>
                        <div className="minicart-product-attribute-name">{`${el[0].attributes[index].name}:`}</div>
                        <div className="mini-attribute-buttons">
                          {e.items.map((element, indx) => {
                            return (
                              <div>
                                {e.type === 'swatch' ? <button 
                                  disabled key={element.id}
                                  className={`${chosenAttributeValues.includes(element.displayValue) ? 'selected-swatch-button' : 'attr-button'}`}
                                  style={{'backgroundColor': element.displayValue, 'width': '25px'}}
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
            <img alt={el[0].name} key={el[0].gallery[0]} className="minicart-prod-photo" src={el[0].gallery[0]} />
          </div>
        )
        })
      }
    }

    const renderminiCart = () => {
      const calcQuantity = () => {
        let quantity = 0;
        this.props.cart.map(el => {
          return quantity += el[2]
        })
        return quantity
      }

      let style = this.state.minicartOpened ? "block" : "none";
      return (
        <div className="minicart-dropdown">
          <div ref={this.cartRef} onClick={(e) => openminiCart(e)} className="minicart">
            <img alt="cart" src={cart} />
            <div className="minicart-count">
              <div className="minicart-count-rect">
                <div className="minicart-count-label">{calcQuantity()}</div>
              </div>
            </div>
            <div ref={this.minicartContentRef} className="minicart-content" style={{"display": `${style}`}}>
              <div className="minicart-products">
                <div className="minicart-title">My Bag, {calcQuantity()} items.</div>
                <div className="minicart-prod">
                  {renderProducts()}.
                </div>
                <div className="total-price">
                  <div className="total-text">Total:</div>
                  {showTotal()}
                </div>
              </div>
              <div className="minicart-buttons">
                <div onClick={() => categorySelect('CART')} className="view-bag">
                  <Link to='/cart'>
                    <button className="view-bag-button">
                      <label className="view-bag-label">VIEW BAG</label>
                    </button>
                  </Link>
                </div>
                <div className="checkout">
                  <button onClick={() => console.log('シシシシ CHECKED OUT シシシシ')} className="checkout-button">
                    <label className="checkout-label">CHECK OUT</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const openCurrencies = () => {
      this.state.currencyOpened ? this.setState({ currencyOpened: false }) : this.setState({ currencyOpened: true })
    }

    const openminiCart = (e) => {
      if(this.state.minicartOpened) {
        if(!this.minicartContentRef.current.contains(e.target)) {
          this.setState({ minicartOpened: false }) 
          document.body.style.background = "white";
          this.removeGray();
        }
      } else {
        this.setState({ minicartOpened: true })
        document.body.style.background = "rgba(57, 55, 72, 0.22)";
        [...document.images].map(el => {
          return !el.classList.contains("minicart-prod-photo") ? el.classList.add('minicart-opened-image') : null;
        })
      }
    }

    const categorySelect = (category) => {
      if(category === 'CART') {
        this.setState({
          minicartOpened: false
        })
        document.body.style.background = 'white'
        this.removeGray();
      }
      this.props.selectCategory(category);
      this.props.showPDP(false);
    }

    return (
      <div>
        <div className="header">
          <div className="navigation">
            {this.state.categories.map(el => {
              if(el.name.toUpperCase() === this.props.selectedCategory) {
                return (
                  <Link key={el.name} to='/'>
                    <div className="selected-category" onClick={() => categorySelect(el.name.toUpperCase())}>
                      {el.name}
                    </div>
                  </Link>
                )
              }
              return (
                <Link to='/'>
                  <div key={el.name} className="category" onClick={() => categorySelect(el.name.toUpperCase())}>{el.name}</div>
                </Link>
              )
            })}
          </div>
          <img key="logo" src={logo} alt="logo" className="logo"></img>
          <div className="actions">
            {renderCurrencies()}
            {renderminiCart()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, { selectCategory, setCurrency, setAllCurrencies, setPDP, showPDP, setTotalPrice })(Header);