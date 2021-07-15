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
      quantities: [],
    };

    this.handlePrice = this.handlePrice.bind(this);
    this.cartAdd = this.cartAdd.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.cartAdd = this.cartAdd.bind(this);
    this.totalItemsSum = this.totalItemsSum.bind(this);
    this.updateCartToApp = this.updateCartToApp.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('quantities'))) {
      this.getLocalStorage();
    }
  }

  handlePrice(price) {
    if (price.toString().includes('.')) {
      const splittedPrice = price.toString().split('.');
      if (splittedPrice[1].length < 2) {
        return `${splittedPrice[0]},${splittedPrice[1]}0`;
      }
      return `${splittedPrice[0]},${splittedPrice[1]}`;
    }
    return `${price},00`;
  }

  setLocalStorage(cart, quantities) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }

  getLocalStorage() {
    const getCart = JSON.parse(localStorage.getItem('cart'));
    const getQuantities = JSON.parse(localStorage.getItem('quantities'));
    this.setState({ cart: getCart, quantities: getQuantities });
  }

  cartAdd(product) {
    const { cart, quantities } = this.state;
    if (quantities.some((p) => p.id === product.id)) {
      const newQuantity = quantities.find((p) => p.id === product.id).quantity + 1;
      const newQuantities = quantities.filter((p) => p.id !== product.id);
      const newProduct = { id: product.id, quantity: newQuantity };
      newQuantities.push(newProduct);
      this.setLocalStorage(cart, newQuantities);
      this.setState({ quantities: newQuantities });
    } else {
      const newCart = cart.map((item) => item);
      newCart.push(product);
      const newQuantities = quantities.map((item) => item);
      const newQuantity = { id: product.id, quantity: 1 };
      newQuantities.push(newQuantity);
      this.setLocalStorage(newCart, newQuantities);
      this.setState({ cart: newCart, quantities: newQuantities });
    }
  }

  updateCartToApp(cartItems, cartQuantities) {
    this.setLocalStorage(cartItems, cartQuantities);
    this.setState({ cart: cartItems, quantities: cartQuantities });
  }

  updatePrice(productPrice) {
    const { price } = this.state;
    const priceNumber = parseInt((price * 100), 10) / 100;
    const priceSum = priceNumber + productPrice;
    const priceNumberFixed = (+priceSum.toFixed(2));
    this.setState({ price: priceNumberFixed });
  }

  totalItemsSum() {
    const { quantities } = this.state;
    const totalSum = quantities.reduce(((acc, curr) => acc + curr.quantity), 0);
    return totalSum;
  }

  render() {
    const { cart, quantities } = this.state;
    return (
      <BrowserRouter>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" alt="carrinho" />
          <p data-testid="shopping-cart-size">{ this.totalItemsSum() }</p>
        </Link>
        <Switch>
          <Route
            path="/cart"
            render={ (props) => (<ShoppingCart
              { ...props }
              cart={ cart }
              quantities={ quantities }
              totalItemsSum={ this.totalItemsSum() }
              updateCartToApp={ this.updateCartToApp }
              handlePrice={ this.handlePrice }
            />) }
          />
          <Route
            path="/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              cartAdd={ this.cartAdd }
              handlePrice={ this.handlePrice }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<ProductList
              { ...props }
              cartAdd={ this.cartAdd }
              handlePrice={ this.handlePrice }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
