import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      price: 0,
      quantities: [],
    };
    this.setCart = this.setCart.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.deleteItemPrice = this.deleteItemPrice.bind(this);
    this.sumItemPrice = this.sumItemPrice.bind(this);
    this.subtractItemPrice = this.subtractItemPrice.bind(this);
  }

  componentDidMount() {
    const { cart, quantities } = this.props;
    this.setCart(cart, quantities);
    this.setPrice();
  }

  handlePlusChange(counter) {
    const counterNumber = counter.innerHTML;
    const parseIntCounterNumber = parseInt(counterNumber, 10);
    const newCounterNumber = parseIntCounterNumber + 1;
    counter.innerHTML = newCounterNumber;
    this.sumItemPrice(counter);
  }

  handleSubtractChange(counter) {
    const counterNumber = counter.innerHTML;
    const parseIntCounterNumber = parseInt(counterNumber, 10);
    if (parseIntCounterNumber > 1) {
      const newCounterNumber = parseIntCounterNumber - 1;
      counter.innerHTML = newCounterNumber;
      this.subtractItemPrice(counter);
    }
    const { cart, quantities } = this.props;
    this.setCart(cart, quantities);
  }

  setCart(items, quantityItems) {
    this.setState({ cartItems: items, quantities: quantityItems });
  }

  setPrice() {
    const { totalPrice } = this.props;
    this.setState({ price: totalPrice });
  }

  deleteItemPrice() {
    const { cartItems } = this.state;
    let newPrice = 0;
    cartItems.forEach((item) => {
      newPrice += +item.price;
    });
    const newPriceFixed = +newPrice.toFixed(2);
    this.setState({ price: newPriceFixed });
  }

  sumItemPrice(childNode) {
    const { price } = this.state;
    const nodePrice = +childNode.parentNode.parentNode.firstChild.innerHTML;
    const newPrice = nodePrice + +price;
    const newPriceFixed = +newPrice.toFixed(2);
    this.setState({ price: newPriceFixed });
  }

  subtractItemPrice(childNode) {
    const { price } = this.state;
    const nodePrice = +childNode.parentNode.parentNode.firstChild.innerHTML;
    const newPrice = +price - nodePrice;
    const newPriceFixed = +newPrice.toFixed(2);
    this.setState({ price: newPriceFixed });
  }

  deleteCartItem(id) {
    const { cartItems } = this.state;
    const newCart = cartItems.map((item) => item);
    const newCartCopy = cartItems.map((item) => item);
    const cartItem = newCart.filter((item) => item.id === id);
    const cartItemIndex = newCartCopy.indexOf(...cartItem);
    newCartCopy.splice(cartItemIndex, 1);
    this.setState({ cartItems: newCartCopy }, () => this.deleteItemPrice());
  }

  render() {
    const { cartItems, quantities, price } = this.state;
    return (
      <div>
        <Link to="/">
          <img src="https://img.icons8.com/ios/50/000000/back--v1.png" alt="voltar" />
        </Link>
        <h1>Carrinho de Compras</h1>
        {cartItems.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cartItems.map((item) => (
            <li
              key={ item.id }
              data-testid="shopping-cart-product-name"
              className={ item.id }
            >
              <div>{ item.price }</div>
              <button
                type="button"
                onClick={ (event) => {
                  this.deleteCartItem(event.target.parentNode.className);
                } }
              >
                X
              </button>
              {' '}
              { item.title }
              {' '}
              <div>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ (event) => {
                    this.handleSubtractChange(event.target.parentNode.lastChild);
                  } }
                >
                  -
                </button>
                {' '}
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ (event) => {
                    this.handlePlusChange(event.target.parentNode.lastChild);
                  } }
                >
                  +
                </button>
                <div data-testid="shopping-cart-product-quantity">
                  { quantities.find((qty) => qty.id === item.id).quantity }
                </div>
              </div>
            </li>))}
        <h2>{`R$${price}`}</h2>
      </div>);
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPrice: PropTypes.number.isRequired,
  quantities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShoppingCart;
