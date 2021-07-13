import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AvaliationCard extends Component {
  render() {
    const { avaliation } = this.props;
    return (
      <div>
        <h4>
          Email:
          { avaliation.email }
        </h4>
        <p>
          Opinião:
          { avaliation.description }
        </p>
        <p>
          Nota atribuída:
          { avaliation.rating }
        </p>
      </div>
    );
  }
}

AvaliationCard.propTypes = {
  avaliation: PropTypes.shape({
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default AvaliationCard;
