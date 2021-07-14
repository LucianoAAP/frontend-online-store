import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
    this.setCart = this.setCart.bind(this);
  }

  componentDidMount() {
    const { cart } = this.props;
    this.setCart(cart);
  }

  setCart(items) {
    this.setState({ cartItems: items });
  }

  render() {
    const { cartItems } = this.state;
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
                1
              </div>
            </li>))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShoppingCart;
