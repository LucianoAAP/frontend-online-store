import React from 'react';
import * as api from '../services/api';
import Category from './Category';

class CategoriesList extends React.Component {
  constructor() {
    super();
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
    if (categories.length === 0) {
      return <h3>Loading...</h3>;
    }
    return (
      <div>
        <h3>Categorias:</h3>
        <ul>
          {categories.map((cat) => <Category data={ cat.name } key={ cat.id } />) }
        </ul>
      </div>
    );
  }
}

export default CategoriesList;
