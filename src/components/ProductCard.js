import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShippingStatus from './ShippingStatus';

class ProductCard extends Component {
  render() {
    const { product, onClick, cartAdd } = this.props;
    const { title, price, thumbnail, shipping } = product;

    return (
      <div data-testid="product" className="product-card">
        <h4>{ title }</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <ShippingStatus status={ shipping.free_shipping } />
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
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  cartAdd: PropTypes.func.isRequired,
};

export default ProductCard;
