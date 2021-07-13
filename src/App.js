import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" alt="carrinho" />
        </Link>
        <Switch>
          <Route path="/cart" component={ ShoppingCart } />
          <Route path="/:id" render={ (props) => <ProductDetails { ...props } /> } />
          <Route exact path="/" component={ ProductList } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
