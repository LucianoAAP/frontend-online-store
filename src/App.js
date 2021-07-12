import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import CategoriesList from './components/CategoriesList';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ ProductList } />
          <Route exact path="/" component={ CategoriesList } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
