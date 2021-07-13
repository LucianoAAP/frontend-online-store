import React from 'react';
import { Redirect } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';
import CategoriesList from './CategoriesList';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchInput: '',
      shouldRedirect: false,
      productRedirection: {},
    };
    this.inputSearchChange = this.inputSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stateSetting = this.stateSetting.bind(this);
    this.searchButton = this.searchButton.bind(this);
  }

  async componentDidMount() {
    const filter = await getProductsFromCategoryAndQuery('', '');
    if (filter) {
      this.stateSetting(filter.results);
    }
  }

  async handleClick(product) {
    this.setState({ shouldRedirect: true, productRedirection: product });
  }

  stateSetting(filteredValue) {
    this.setState({ products: filteredValue });
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
    const { products, searchInput, shouldRedirect, productRedirection } = this.state;
    if (shouldRedirect) {
      return (
        <Redirect
          to={ {
            pathname: `/${productRedirection.id}`,
            state: { productRedirection },
          } }
        />
      );
    }
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
        <CategoriesList />
        <div>
          { products.map((product) => (
            <ProductCard
              key={ product.title }
              product={ product }
              onClick={ this.handleClick }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
