import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CustumerEvaluation from '../../components/CustumerEvaluation';
import ShippingStatus from '../../components/ShippingStatus';
import './productDetails.css';

class ProductDetails extends React.Component {
  render() {
    const { location, cartAdd, handlePrice } = this.props;
    const { productRedirection } = location.state;
    const { title, price, thumbnail, shipping } = productRedirection;
    const newPrice = handlePrice(price);

    return (
      <div>
        <Link to="/">
          <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="voltar" />
        </Link>
        <div className="details-container">
          <h3 data-testid="product-detail-name">{ `${title} - R$${newPrice}` }</h3>
          <section className="details-step1">
            <ShippingStatus status={ shipping.free_shipping } />
            <img src={ thumbnail } alt={ title } />
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => cartAdd(productRedirection) }
              className="btn-cart"
            >
              <img src="https://img.icons8.com/cute-clipart/64/000000/shopping-cart.png" alt="cart" />
              Adicionar ao carrinho
            </button>
          </section>
          <div>
            <CustumerEvaluation title={ title } />
          </div>
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
