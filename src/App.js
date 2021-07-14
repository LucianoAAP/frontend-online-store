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
    this.cartQuantityAdd = this.cartQuantityAdd.bind(this);
    this.cartQuantitySub = this.cartQuantitySub.bind(this);
    this.cartItemDelete = this.cartItemDelete.bind(this);
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

  cartAdd(product) {
    const { cart, quantities } = this.state;
    if (quantities.some((p) => p.id === product.id)) {
      const newQuantity = quantities.find((p) => p.id === product.id).quantity + 1;
      const newQuantities = quantities.filter((p) => p.id !== product.id);
      const newProduct = { id: product.id, quantity: newQuantity };
      newQuantities.push(newProduct);
      this.setState({ quantities: newQuantities });
    } else {
      const newCart = cart.map((item) => item);
      newCart.push(product);
      const newQuantities = quantities.map((item) => item);
      const newQuantity = { id: product.id, quantity: 1 };
      newQuantities.push(newQuantity);
      this.setState({ cart: newCart, quantities: newQuantities });
    }
  }

  cartQuantityAdd(itemId) {
    const { quantities } = this.state;
    const newQuantity = quantities.find((qty) => qty.id === itemId).quantity + 1;
    const newQuantities = quantities.filter((p) => p.id !== itemId);
    const newProduct = { id: itemId, quantity: newQuantity };
    newQuantities.push(newProduct);
    this.setState({ quantities: newQuantities });
  }

  cartQuantitySub(itemId) {
    const { quantities } = this.state;
    const newQuantity = quantities.find((qty) => qty.id === itemId).quantity - 1;
    if (newQuantity > 0) {
      const newQuantities = quantities.filter((p) => p.id !== itemId);
      const newProduct = { id: itemId, quantity: newQuantity };
      newQuantities.push(newProduct);
      this.setState({ quantities: newQuantities });
    }
  }

  cartItemDelete(cartItems, cartQuantities) {
    this.setState({ cart: cartItems, quantities: cartQuantities });
  }

  updatePrice(productPrice) {
    const { price } = this.state;
    const priceNumber = parseInt((price * 100), 10) / 100;
    const priceSum = priceNumber + productPrice;
    const priceNumberFixed = (+priceSum.toFixed(2));
    this.setState({ price: priceNumberFixed });
  }

  render() {
    const { cart, quantities } = this.state;
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
              quantities={ quantities }
              cartQuantityAdd={ this.cartQuantityAdd }
              cartQuantitySub={ this.cartQuantitySub }
              cartItemDelete={ this.cartItemDelete }
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
