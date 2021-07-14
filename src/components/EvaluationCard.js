import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EvaluationCard extends Component {
  render() {
    const { evaluation } = this.props;
    return (
      <div>
        <h4>
          Email:
          { evaluation.email }
        </h4>
        <p>
          Opinião:
          { evaluation.description }
        </p>
        <p>
          Nota atribuída:
          { evaluation.rating }
        </p>
      </div>
    );
  }
}

EvaluationCard.propTypes = {
  evaluation: PropTypes.shape({
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default EvaluationCard;
