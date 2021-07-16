import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  render() {
    const { qnt } = this.props;
    return (
      <header className="header-container">
        <h4> </h4>
        <h2>Front Online Store</h2>
        <div>
          <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" alt="carrinho" />
          <span data-testid="shopping-cart-size">{ qnt }</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  qnt: PropTypes.number.isRequired,
};

export default Header;
