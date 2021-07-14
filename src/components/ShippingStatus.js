import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShippingStatus extends Component {
  render() {
    const { status } = this.props;
    return (
      status
        ? <p className="shipping-status" data-testid="free-shipping">Frete Grátis</p>
        : null
    );
  }
}

ShippingStatus.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default ShippingStatus;
