import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './checkout.css';
import PropTypes from 'prop-types';
import Spinner from '../../img/spinner.jpg';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      cpf: '',
      email: '',
      tel: '',
      cep: '',
      address: '',
      status: 'waiting',
      submit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.check = this.check.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.check());
  }

  check() {
    const arrayState = Object.values(this.state);
    const filled = arrayState.every((state) => state !== '');
    if (filled) this.setState({ status: 'OK' });
  }

  submit(e) {
    const { finishSale } = this.props;
    e.preventDefault();
    const { status } = this.state;
    if (status === 'OK') {
      this.setState({ submit: true }, () => finishSale());
    }
  }

  fullName() {
    return (
      <input
        type="text"
        data-testid="checkout-fullname"
        id="fullname"
        name="fullname"
        placeholder="Nome Completo"
        onChange={ this.handleChange }
        required
      />
    );
  }

  cpf() {
    return (
      <input
        type="text"
        data-testid="checkout-cpf"
        id="cpf"
        name="cpf"
        placeholder="CPF"
        onChange={ this.handleChange }
        required
      />
    );
  }

  email() {
    return (
      <input
        type="email"
        data-testid="checkout-email"
        id="email"
        name="email"
        placeholder="Email"
        onChange={ this.handleChange }
        required
      />
    );
  }

  tel() {
    return (
      <input
        type="text"
        data-testid="checkout-phone"
        id="tel"
        name="tel"
        placeholder="Telefone"
        onChange={ this.handleChange }
        required
      />
    );
  }

  cep() {
    return (
      <input
        type="text"
        data-testid="checkout-cep"
        id="cep"
        name="cep"
        placeholder="CEP"
        onChange={ this.handleChange }
        required
      />
    );
  }

  address() {
    return (
      <input
        type="text"
        data-testid="checkout-address"
        id="address"
        name="address"
        placeholder="Endereço"
        onChange={ this.handleChange }
        required
      />
    );
  }

  complement() {
    return (
      <input type="text" id="complement" name="complement" placeholder="Complemento" />
    );
  }

  num() {
    return (
      <input type="text" id="num" name="num" placeholder="Número" />
    );
  }

  city() {
    return (
      <input type="text" id="city" name="city" placeholder="Cidade" />
    );
  }

  render() {
    const { cart, quantities, handlePrice } = this.props;
    const { submit } = this.state;
    if (submit) {
      return (
        <div className="states-success">
          <meta http-Equiv="refresh" content="3; URL='/'" />
          <h2>Compra Realizada com Sucesso!!!</h2>
          <p>Volte sempre! :D</p>
          <img src={ Spinner } alt="spinner" width="300" />
        </div>
      );
    }
    const totalPrice = cart.reduce((accumulator, current) => {
      accumulator += current.price * quantities
        .find((item) => item.id === current.id).quantity;
      return accumulator;
    }, 0);
    const total = handlePrice(totalPrice);
    return (
      <form onSubmit={ this.submit }>
        <header>
          <Link to="/">
            <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="voltar" />
          </Link>
        </header>
        <section>
          <h3>Finalizar Compras</h3>
          <div className="review-container">
            <h4>Revise seus Produtos</h4>
            <table cellPadding="10px">
              {cart.map(({ id, title, price }) => {
                const { quantity } = quantities.find((item) => item.id === id);
                return (
                  <tbody key={ id }>
                    <tr>
                      <td><img src="https://img.icons8.com/windows/32/000000/checked--v1.png" alt="checked" /></td>
                      <td>{`${title}`}</td>
                      <td>{`x ${quantity}`}</td>
                      <td>{`${handlePrice(price * quantity)}`}</td>
                    </tr>
                  </tbody>);
              })}
            </table>
            <h4>{`Total: ${total}`}</h4>
          </div>
          <div className="buyer-info-container">
            <h4>Informações do Comprador</h4>
            <div>
              {this.fullName()}
              {this.cpf()}
              {this.email()}
              {this.tel()}
              {this.cep()}
              {this.address()}
              {this.complement()}
              {this.num()}
              {this.city()}
            </div>
          </div>
          <div className="payment-container">
            <h4>Método de Pagamento</h4>
            <div>
              <span>Boleto: </span>
              <input type="radio" id="boleto" name="payment" required />
              <img src="https://img.icons8.com/color/48/000000/boleto-bankario.png" alt="icon-boleto" />
            </div>
            <div>
              <p>Cartão de Crédito: </p>
              <input type="radio" id="visa" name="payment" required />
              <span>Visa</span>
              <img src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" alt="icon-card" />
              <input type="radio" id="master" name="payment" required />
              <span>Master</span>
              <img src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" alt="icon-card" />
              <input type="radio" id="elo" name="payment" required />
              <span>Elo</span>
              <img src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" alt="icon-card" />
            </div>
          </div>
          <nav className="buttons-container">
            <button type="submit" className="buy-button">
              Comprar
            </button>
          </nav>
        </section>
      </form>
    );
  }
}
Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.object).isRequired,
  finishSale: PropTypes.func.isRequired,
  handlePrice: PropTypes.func.isRequired,
};
export default Checkout;
