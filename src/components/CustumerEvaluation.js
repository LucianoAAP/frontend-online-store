import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EvaluationCard from './EvaluationCard';

class CustumerEvaluation extends Component {
  constructor(props) {
    super(props);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {
      evaluation: {
        email: '',
        description: '',
        rating: 0,
      },
      evaluationArray: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  setLocalStorage() {
    const { evaluation } = this.state;
    const { title } = this.props;
    const save = JSON.parse(localStorage.getItem(`Product: ${title}`));
    if (save) {
      localStorage.setItem(`Product: ${title}`, JSON.stringify([...save, evaluation]));
      this.setState({
        evaluationArray: [...save, evaluation],
      });
    } else {
      localStorage.setItem(`Product: ${title}`, JSON.stringify([evaluation]));
      this.setState({
        evaluationArray: [evaluation],
      });
    }
    this.setState({
      evaluation: {
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
        evaluationArray: save,
      });
    }
  }

  updateState(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      evaluation: {
        ...prevState.evaluation,
        [name]: value,
      },
    }));
  }

  render() {
    const { evaluation, evaluationArray } = this.state;
    const { email, description, rating } = evaluation;
    return (
      <div className="rating-container">
        {/* <h2>Avaliações:</h2> */}
        <form>
          <h3>Sua Avaliação:</h3>
          <div>
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.updateState }
              placeholder="Coloque seu Email"
              className="put-email"
              required
            />
            <div className="grade-div">
              <span>Nota: </span>
              <input
                type="number"
                name="rating"
                value={ rating }
                onChange={ this.updateState }
                min={ 0 }
                max={ 5 }
                className="put-grade"
                required
              />
            </div>
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            type="text"
            name="description"
            value={ description }
            onChange={ this.updateState }
            placeholder="Opcional: Nos diga sua opinião."
            className="put-evaluation"
          />
          <button
            type="button"
            onClick={ this.setLocalStorage }
          >
            Enviar Avaliação
          </button>
        </form>
        <div className="all-evalutations">
          Todas as avaliações:
          {
            evaluationArray
              ? evaluationArray
                .map((item, idx) => <EvaluationCard key={ idx } evaluation={ item } />)
              : null
          }
        </div>
      </div>
    );
  }
}

CustumerEvaluation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CustumerEvaluation;
