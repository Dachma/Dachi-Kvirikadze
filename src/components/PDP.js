import React from "react";
import { connect } from "react-redux";
import { selectCategory, addToCart } from "../actions";
import './PDP.css';

class PDP extends React.Component {
  state = {
    selectedPhoto: this.props.PDPproduct.gallery[0],
    Size: false,
    Color: false,
    Capacity: false,
    USB: false,
    Touch: false
  }

  render() {
    const product = this.props.PDPproduct;
    
    const sendToCart = () => {
      let arrOfAttributeNames = product.attributes.map(el => {
        return el.name;
      });
      let arrOfState = Object.keys(this.state).map((key) => [(key), this.state[key]]);
      
      const matches = arrOfAttributeNames.map(elem => {
        return arrOfState.filter((el) => {
          if(elem.includes(el[0])) {
            return el[0]
          }
        })
      })
      const matchingAttributes = matches.map(el => {
        return el[0]
      })
      const trueFalse = matchingAttributes.map(el => {
        return el[1]
      })
      const amountOfProduct = 1;
      const indexOfPicture = 0;
      if(!trueFalse.includes(false)) {
        this.props.addToCart([product, matchingAttributes, amountOfProduct, indexOfPicture]);
        alert('ADDED');
      } else {
        alert('Please Choose Attributes.')
      }
    }

    const selectButton = (e, thisState, action, toFalseAction) => {
      let classes = e.target.classList
      if(!classes.value.includes("selected-button") && !thisState) {
        classes.add("selected-button");
        this.setState(action)
      } else if(classes.value.includes("selected-button") && thisState) {
        classes.remove("selected-button");
        this.setState(toFalseAction)
      }
    }
    
    const renderImages = () => {
      return product.gallery.map((el, index) => {
        return <img key={index} onClick={() => this.setState({ selectedPhoto: el })} src={el} className="images" style={{"top": `${160 + index * 100}px`}} />
      })
    }

    const renderAttributes = () => {

      return product.attributes.map((el, index) => {

        if(el.type === 'text') {
          let attributeName = el.name;
          return (
            <div>
              <div className="attribute-name">{`${product.attributes[index].name}:`}</div>
              <div className="attribute-select">
                {el.items.map(el => {
                  return (
                    <div>
                      <button onClick={
                        (e) => 
                        attributeName === 'Size' ? selectButton(e, this.state.Size, {Size: e.target.childNodes[0].textContent}, {Size: false}) : 
                        attributeName === 'Capacity' ? selectButton(e, this.state.Capacity, {Capacity: e.target.childNodes[0].textContent}, {Capacity: false}) : 
                        attributeName === 'With USB 3 ports' ? selectButton(e, this.state.USB, {USB: e.target.childNodes[0].textContent}, {USB: false}) : 
                        attributeName === 'Touch ID in keyboard' ? selectButton(e, this.state.Touch, {Touch: e.target.childNodes[0].textContent}, {Touch: false}) : null
                        } key={el.value} className="select-buttons" >{el.value}</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
        if(el.type === 'swatch') {
          return (
            <div>
              <div className="attribute-name">{`${product.attributes[index].name}:`}</div>
              <div className="attribute-select">
                {el.items.map(el => {
                  return (
                  <div className="attribute-select">
                    <button onClick={(e) => selectButton(e, this.state.Color, {Color: el.displayValue}, {Color: false})} key={el.value} className="select-buttons" style={{ "backgroundColor": `${el.value}`}} />
                  </div>
                  )
                })}
              </div>
            </div>
          )
        }
      })
    }

    const isStock = () => {
      if(product.inStock) {
        return (
          <div>
            <button onClick={() => sendToCart()} className="addToCart">ADD TO CART</button>
            <div dangerouslySetInnerHTML={{__html: product.description}} />
          </div>
        )
      }
      return <h1 className="description">WE ARE SORRY, THE PRODUCT IS OUT OF STOCK.</h1>
    }

    if(this.props.showPDP) {
      return (
        <div className="PDP">
          <div className="contents">
            {renderImages()}
            <img src={this.state.selectedPhoto} className="main-image"/>
            <div className="info">
              <div className="brand">{product.brand}</div>
              <div className="product--name">{product.name}</div>
              <div className="attribute-buttons">
                {renderAttributes()}
              </div>
              <div className="info--price">PRICE:</div>
              <div className="info--amount">{`${this.props.selectedCurrency}${product.prices[this.props.indexForAmount].amount}`}</div>
              {isStock()}
            </div>
          </div>
        </div>
      )
    }
    return false;
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {selectCategory, addToCart})(PDP);