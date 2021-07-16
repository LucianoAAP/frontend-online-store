import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import CategoriesList from '../../components/CategoriesList';
import Spinner from '../../img/loading.gif';
import './productList.css';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchInput: '',
      shouldRedirect: false,
      productRedirection: {},
      category: '',
      loading: false,
    };
    this.inputSearchChange = this.inputSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stateSetting = this.stateSetting.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  async componentDidMount() {
    const filter = await getProductsFromCategoryAndQuery('', '');
    if (filter) {
      this.stateSetting(filter.results);
    }
  }

  handleClick(product) {
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
    const { searchInput, category } = this.state;
    const filter = await getProductsFromCategoryAndQuery(category, searchInput);
    this.setState({
      products: filter.results,
      searchInput: '',
      loading: false,
    });
  }

  updateCategory(event) {
    const { id } = event.target;
    this.setState({ category: id, loading: true }, () => this.searchButton());
  }

  render() {
    const { cartAdd, handlePrice } = this.props;
    const {
      products,
      searchInput,
      loading,
      shouldRedirect,
      productRedirection,
    } = this.state;

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
        <form className="search-container">
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
            onClick={ () => {
              this.setState({ loading: true }, () => this.searchButton());
            } }
          >
            Procurar
          </button>
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div className="main-container">
          <CategoriesList callback={ this.updateCategory } />
          <div className="product-container">
            {loading
              ? <span><img src={ Spinner } alt="spinner" width="300" /></span>
              : products.map((product, index) => (
                <ProductCard
                  key={ index }
                  product={ product }
                  onClick={ this.handleClick }
                  cartAdd={ cartAdd }
                  handlePrice={ handlePrice }
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  cartAdd: PropTypes.func.isRequired,
  handlePrice: PropTypes.func.isRequired,
};

export default ProductList;
