import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList/ProductList';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';

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
    this.finishSale = this.finishSale.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  handlePrice(price) {
    const fixedPrice = Math.round((price) * 100) / 100;
    if (fixedPrice.toString().includes('.')) {
      const splittedPrice = fixedPrice.toString().split('.');
      if (splittedPrice[1].length < 2) {
        return `R$${splittedPrice[0]},${splittedPrice[1]}0`;
      }
      return `R$${splittedPrice[0]},${splittedPrice[1]}`;
    }
    return `R$${fixedPrice},00`;
  }

  setLocalStorage(cart, quantities) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }

  getLocalStorage() {
    if (JSON.parse(localStorage.getItem('quantities'))) {
      const getCart = JSON.parse(localStorage.getItem('cart'));
      const getQuantities = JSON.parse(localStorage.getItem('quantities'));
      this.setState({ cart: getCart, quantities: getQuantities });
    }
  }

  cartAdd(product) {
    const { cart, quantities } = this.state;
    if (quantities.some((p) => p.id === product.id)) {
      const cartProduct = cart.find((item) => item.id === product.id);
      const itemQuantity = quantities.find((p) => p.id === product.id);
      if (itemQuantity.quantity < cartProduct.available_quantity) {
        const newQuantity = itemQuantity.quantity + 1;
        const newQuantities = quantities.filter((p) => p.id !== product.id);
        const newProduct = { id: product.id, quantity: newQuantity };
        newQuantities.push(newProduct);
        this.setLocalStorage(cart, newQuantities);
        this.setState({ quantities: newQuantities });
      }
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

  finishSale() {
    const newCart = [];
    const newQuantities = [];
    this.updateCartToApp(newCart, newQuantities);
  }

  render() {
    const { cart, quantities } = this.state;
    return (
      <BrowserRouter>
        <Link to="/cart" data-testid="shopping-cart-button">
          <Header qnt={ this.totalItemsSum() } />
        </Link>
        <Switch>
          <Route
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              cart={ cart }
              quantities={ quantities }
              finishSale={ this.finishSale }
              handlePrice={ this.handlePrice }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<ShoppingCart
              { ...props }
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
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
