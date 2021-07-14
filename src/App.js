import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      price: 0,
    };
    this.handleCart = this.handleCart.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
  }

  handleCart(product) {
    const { cart } = this.state;
    if (cart.length === 0) {
      this.setState({ cart: [product] }, this.updatePrice(product.price));
    } else if (cart.find((cartItem) => cartItem.id === product.id) !== product) {
      const newCart = cart.map((item) => item);
      newCart.push(product);
      this.setState({ cart: newCart }, this.updatePrice(product.price));
    }
  }

  updatePrice(productPrice) {
    const { price } = this.state;
    const priceNumber = parseInt((price * 100), 10) / 100;
    const priceSum = priceNumber + productPrice;
    const priceNumberFixed = (+priceSum.toFixed(2));
    this.setState({ price: priceNumberFixed });
  }

  render() {
    const { cart, price } = this.state;
    return (
      <BrowserRouter>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" alt="carrinho" />
        </Link>
        <Switch>
          <Route
            path="/cart"
            render={ (props) => (<ShoppingCart
              { ...props }
              cart={ cart }
              totalPrice={ price }
            />) }
          />
          <Route
            path="/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              cartAdd={ this.handleCart }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<ProductList
              { ...props }
              cartAdd={ this.handleCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
