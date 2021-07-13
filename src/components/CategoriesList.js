import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Category from './Category';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    api.getCategories()
      .then((response) => this.setState({ categories: [...response] }));
  }

  render() {
    const { categories } = this.state;
    const { callback } = this.props;
    if (categories.length === 0) {
      return <h3>Loading...</h3>;
    }
    return (
      <div className="cat-container">
        <h3>Categorias:</h3>
        <ul>
          {categories.map((cat) => (
            <Category
              data={ cat }
              key={ cat.id }
              callback={ callback }
            />))}
        </ul>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default CategoriesList;
