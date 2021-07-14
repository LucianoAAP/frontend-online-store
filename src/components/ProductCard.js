import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  constructor() {
    super();
    this.handlePrice = this.handlePrice.bind(this);
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

  render() {
    const { product, onClick, cartAdd } = this.props;
    const { title, price, thumbnail } = product;
    const newPrice = this.handlePrice(price);

    return (
      <div data-testid="product" className="product-card">
        <h4>{ title }</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ newPrice }</p>
        <button
          type="button"
          data-testid="product-detail-link"
          onClick={ () => onClick(product) }
        >
          Ver Detalhes
        </button>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => cartAdd(product) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  cartAdd: PropTypes.func.isRequired,
};

export default ProductCard;
