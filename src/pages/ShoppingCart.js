import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      quantities: [],
    };
    this.setCart = this.setCart.bind(this);
  }

  componentDidMount() {
    const { cart, quantities } = this.props;
    this.setCart(cart, quantities);
  }

  setCart(items, quantityItems) {
    this.setState({ cartItems: items, quantities: quantityItems });
  }

  render() {
    const { cartItems, quantities } = this.state;
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
            >
              { item.title }
              <div data-testid="shopping-cart-product-quantity">
                { quantities.find((qty) => qty.id === item.id).quantity }
              </div>
            </li>))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShoppingCart;
