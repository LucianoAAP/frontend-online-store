import React from 'react';
import CategoriesList from './CategoriesList';

class ProductList extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CategoriesList />
      </div>
    );
  }
}

export default ProductList;
