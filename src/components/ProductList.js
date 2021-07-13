import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';
import CategoriesList from './CategoriesList';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchInput: '',
      category: '',
    };
    this.inputSearchChange = this.inputSearchChange.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  inputSearchChange(event) {
    const { value } = event.target;
    this.setState({
      searchInput: value,
    });
  }

  async searchButton() {
    const { searchInput, category } = this.state;
    const filter = await getProductsFromCategoryAndQuery(category, searchInput);
    this.setState({
      products: filter.results,
      searchInput: '',
    });
  }

  updateCategory(event) {
    const { id } = event.target;
    this.setState({ category: id }, () => this.searchButton());
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
        <CategoriesList callback={ this.updateCategory } />
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
