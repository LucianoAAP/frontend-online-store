import React from 'react';
import PropTypes from 'prop-types';
import CustumerEvaluation from '../components/CustumerEvaluation';

class ProductDetails extends React.Component {
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
    const { location, cartAdd } = this.props;
    const { productRedirection } = location.state;
    const { title, price, thumbnail } = productRedirection;
    const newPrice = this.handlePrice(price);

    return (
      <div>
        <h3 data-testid="product-detail-name">{ `${title} - R$${newPrice}` }</h3>
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
      }).isRequired,
    }).isRequired,
  }).isRequired,
  cartAdd: PropTypes.func.isRequired,
};

export default ProductDetails;
