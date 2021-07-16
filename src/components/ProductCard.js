import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShippingStatus from './ShippingStatus';

class ProductCard extends Component {
  render() {
    const { product, onClick, cartAdd, handlePrice } = this.props;
    const { title, price, thumbnail, shipping } = product;
    const newPrice = handlePrice(price);

    return (
      <div data-testid="product" className="product-card">
        <button
          type="button"
          data-testid="product-detail-link"
          onClick={ () => onClick(product) }
          className="details-button"
        >
          <h4>{ title }</h4>
          <img src={ thumbnail } alt={ title } />
          <p>{ newPrice }</p>
          <ShippingStatus status={ shipping.free_shipping } />
        </button>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => cartAdd(product) }
          className="btn-addtocard"
        >
          <img src="https://img.icons8.com/color/80/000000/add-shopping-cart--v1.png" alt="cart" />
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
  handlePrice: PropTypes.func.isRequired,
};

export default ProductCard;
