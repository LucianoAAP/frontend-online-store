import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvaliationCard from './AvaliationCard';

class CostumerAvaliation extends Component {
  constructor(props) {
    super(props);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {
      avaliation: {
        email: '',
        description: '',
        rating: 0,
      },
      avaliationArray: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  setLocalStorage() {
    const { avaliation } = this.state;
    const { title } = this.props;
    const save = JSON.parse(localStorage.getItem(`Product: ${title}`));
    if (save) {
      localStorage.setItem(`Product: ${title}`, JSON.stringify([...save, avaliation]));
      this.setState({
        avaliationArray: [...save, avaliation],
      });
    } else {
      localStorage.setItem(`Product: ${title}`, JSON.stringify([avaliation]));
      this.setState({
        avaliationArray: [avaliation],
      });
    }
    this.setState({
      avaliation: {
        email: '',
        description: '',
        rating: 0,
      },
    });
  }

  getLocalStorage() {
    const { title } = this.props;
    const save = JSON.parse(localStorage.getItem(`Product: ${title}`));
    if (save) {
      this.setState({
        avaliationArray: save,
      });
    }
  }

  updateState(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      avaliation: {
        ...prevState.avaliation,
        [name]: value,
      },
    }));
  }

  render() {
    const { avaliation, avaliationArray } = this.state;
    const { email, description, rating } = avaliation;
    return (
      <div>
        <h2>Avaliações:</h2>
        <form>
          <h3>Sua Avaliação:</h3>
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.updateState }
            placeholder="Coloque seu Email"
            required
          />
          <textarea
            data-testid="product-detail-evaluation"
            type="text"
            name="description"
            value={ description }
            onChange={ this.updateState }
            placeholder="Opcional: Nos diga sua opinião."
          />
          <input
            type="number"
            name="rating"
            value={ rating }
            onChange={ this.updateState }
            min={ 0 }
            max={ 5 }
            required
          />
          <button
            type="button"
            onClick={ this.setLocalStorage }
          >
            Enviar Avaliação
          </button>
        </form>
        <div>
          Todas as avaliações:
          {
            avaliationArray
              ? avaliationArray
                .map((item, idx) => <AvaliationCard key={ idx } avaliation={ item } />)
              : null
          }
        </div>
      </div>
    );
  }
}

CostumerAvaliation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CostumerAvaliation;
