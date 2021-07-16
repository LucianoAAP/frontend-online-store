import React from 'react';
import PropTypes from 'prop-types';
import CustumerEvaluation from '../components/CustumerEvaluation';
import ShippingStatus from '../components/ShippingStatus';

class ProductDetails extends React.Component {
  render() {
    const { location, cartAdd, handlePrice } = this.props;
    const { productRedirection } = location.state;
    const { title, price, thumbnail, shipping } = productRedirection;
    const newPrice = handlePrice(price);

    return (
      <div>
        <h3 data-testid="product-detail-name">{ `${title} - ${newPrice}` }</h3>
        <ShippingStatus status={ shipping.free_shipping } />
        <img src={ thumbnail } alt={ title } />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => cartAdd(productRedirection) }
        >
          Adicionar ao carrinho
        </button>
        <div>
          <CustumerEvaluation title={ title } />
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productRedirection: PropTypes.shape({
        price: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        shipping: PropTypes.shape({
          free_shipping: PropTypes.bool.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  cartAdd: PropTypes.func.isRequired,
  handlePrice: PropTypes.func.isRequired,
};

export default ProductDetails;
