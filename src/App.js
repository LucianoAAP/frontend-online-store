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
      quantities: [],
    };

    this.cartAdd = this.cartAdd.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.cartAdd = this.cartAdd.bind(this);
    this.totalItemsSum = this.totalItemsSum.bind(this);
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

  updatePrice(productPrice) {
    const { price } = this.state;
    const priceNumber = parseInt((price * 100), 10) / 100;
    const priceSum = priceNumber + productPrice;
    const priceNumberFixed = (+priceSum.toFixed(2));
    this.setState({ price: priceNumberFixed });
  }

  totalItemsSum() {
    const { quantities } = this.state;
    const totalSum = quantities
      .map((qnt) => qnt.quantity)
      .reduce(((acc, curr) => acc + curr), 0);
    return totalSum;
  }

  render() {
    const { cart, price, quantities } = this.state;
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
              totalPrice={ price }
              quantities={ quantities }
              totalItemsSum={ this.totalItemsSum() }
            />) }
          />
          <Route
            path="/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              cartAdd={ this.cartAdd }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<ProductList
              { ...props }
              cartAdd={ this.cartAdd }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
