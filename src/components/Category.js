import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class Category extends React.Component {
  render() {
    const { data, callback } = this.props;
    return (
      <li 
        data-testid="category" 
        onClick={ callback }
        id={ data.id }
        name="category"
        >
        {data.name}
      </li>
    );
  }
}

Category.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Category;
