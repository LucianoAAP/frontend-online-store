import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchInput: '',
    };
    this.inputSearchChange = this.inputSearchChange.bind(this);
    this.searchButton = this.searchButton.bind(this);
  }

  inputSearchChange(event) {
    const { value } = event.target;
    this.setState({
      searchInput: value,
    });
  }

  async searchButton() {
    const { searchInput } = this.state;
    const filter = await getProductsFromCategoryAndQuery('', searchInput);
    this.setState({
      products: filter.results,
      searchInput: '',
    });
  }

  render() {
    const { products, searchInput } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="searchProduct">
            <input
              type="text"
              name="searchProduct"
              value={ searchInput }
              data-testid="query-input"
              onChange={ this.inputSearchChange }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.searchButton }
          >
            Procurar
          </button>
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          { products.map((product) => (
            <ProductCard key={ product.title } product={ product } />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
