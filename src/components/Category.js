import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { data, callback } = this.props;
    return (
      <li>
        <input
          className="cat-list-buttons"
          type="button"
          id={ data.id }
          data-testid="category"
          onClick={ callback }
          value={ data.name }
        />
      </li>
    );
  }
}

Category.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Category;
