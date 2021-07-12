import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { data } = this.props;
    return <li data-testid="category">{data}</li>;
  }
}

Category.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Category;
