import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './shoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      quantities: [],
    };
    this.setCart = this.setCart.bind(this);
    this.handlePlusChange = this.handlePlusChange.bind(this);
    this.handleSubtractChange = this.handleSubtractChange.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.handleTotalPrice = this.handleTotalPrice.bind(this);
  }

  componentDidMount() {
    this.setCart();
  }

  handlePlusChange(itemId) {
    const { updateCartToApp } = this.props;
    const { cartItems, quantities } = this.state;
    const cartProduct = cartItems.find((Product) => Product.id === itemId);
    const itemQuantity = quantities.find((qty) => qty.id === itemId);
    if (itemQuantity.quantity < cartProduct.available_quantity) {
      const newQuantity = itemQuantity.quantity + 1;
      const newQuantities = quantities.filter((p) => p.id !== itemId);
      const newProduct = { id: itemId, quantity: newQuantity };
      newQuantities.push(newProduct);
      this.setState({ quantities: newQuantities });
      updateCartToApp(cartItems, newQuantities);
    }
  }

  handleSubtractChange(itemId) {
    const { updateCartToApp } = this.props;
    const { cartItems, quantities } = this.state;
    const newQuantity = quantities.find((qty) => qty.id === itemId).quantity - 1;
    if (newQuantity === 0) {
      this.deleteCartItem(itemId);
    } else {
      const newQuantities = quantities.filter((p) => p.id !== itemId);
      const newProduct = { id: itemId, quantity: newQuantity };
      newQuantities.push(newProduct);
      this.setState({ quantities: newQuantities });
      updateCartToApp(cartItems, newQuantities);
    }
  }

  handleTotalPrice() {
    const { cartItems, quantities } = this.state;
    if (cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce((accumulator, current) => {
      accumulator += current.price * quantities
        .find((item) => item.id === current.id).quantity;
      return accumulator;
    }, 0);
  }

  setCart() {
    if (JSON.parse(localStorage.getItem('quantities'))) {
      const getCart = JSON.parse(localStorage.getItem('cart'));
      const getQuantities = JSON.parse(localStorage.getItem('quantities'));
      this.setState({ cartItems: getCart, quantities: getQuantities });
    }
  }

  deleteCartItem(id) {
    const { updateCartToApp } = this.props;
    const { cartItems, quantities } = this.state;
    const newCart = cartItems.filter((item) => item.id !== id);
    const newQuantities = quantities.filter((item) => item.id !== id);
    this.setState({ cartItems: newCart, quantities: newQuantities });
    updateCartToApp(newCart, newQuantities);
  }

  deleteCart() {
    const { updateCartToApp } = this.props;
    const newCart = [];
    const newQuantities = [];
    this.setState({ cartItems: newCart, quantities: newQuantities });
    updateCartToApp(newCart, newQuantities);
  }

  render() {
    const { cartItems, quantities } = this.state;
    const { handlePrice } = this.props;
    const totalPrice = handlePrice(this.handleTotalPrice());
    return (
      <div>
        <Link to="/">
          <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="voltar" />
        </Link>
        <div className="cart-container">
          <h1>Carrinho de Compras</h1>
          <ul className="items-list">
            {cartItems.length === 0
              ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              : cartItems.map((item) => {
                const { quantity } = quantities.find((qty) => qty.id === item.id);
                return (
                  <li
                    key={ item.id }
                    data-testid="shopping-cart-product-name"
                    className={ item.id }
                  >
                    <button
                      type="button"
                      onClick={ () => {
                        this.deleteCartItem(item.id);
                      } }
                    >
                      X
                    </button>
                    { `${item.title}` }
                    <div>
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => this.handleSubtractChange(item.id) }
                      >
                        -
                      </button>
                      {' '}
                      <span data-testid="shopping-cart-product-quantity">
                        {` ( ${quantity} )`}
                      </span>
                      {' '}
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        onClick={ () => this.handlePlusChange(item.id) }
                      >
                        +
                      </button>
                      <span className="price-span">
                        { handlePrice(item.price * quantity) }
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
          <h2>{ totalPrice }</h2>
          {cartItems.length > 0
            && (
              <div>
                <button
                  type="button"
                  onClick={ this.deleteCart }
                >
                  Limpar Carrinho
                </button>
                {' '}
                <nav>
                  <Link to="/checkout">
                    <button
                      type="button"
                      data-testid="checkout-products"
                      className="buy-btn"
                    >
                      Finalizar Compra
                    </button>
                  </Link>
                </nav>
              </div>
            )}
        </div>
      </div>);
  }
}

ShoppingCart.propTypes = {
  updateCartToApp: PropTypes.func.isRequired,
  handlePrice: PropTypes.func.isRequired,
};

export default ShoppingCart;
