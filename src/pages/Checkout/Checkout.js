import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './checkout.css';
import PropTypes from 'prop-types';

class Checkout extends Component {
  fullName() {
    return (
      <input
        type="text"
        data-testid="checkout-fullname"
        id="fullname"
        name="fullname"
        placeholder="Nome Completo"
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
      />
    );
  }

  email() {
    return (
      <input
        type="text"
        data-testid="checkout-email"
        id="email"
        name="email"
        placeholder="Email"
      />
    );
  }

  phone() {
    return (
      <input
        type="text"
        data-testid="checkout-phone"
        id="tel"
        name="tel"
        placeholder="Telefone"
      />
    );
  }

  zip() {
    return (
      <input
        type="text"
        data-testid="checkout-cep"
        id="cep"
        name="cep"
        placeholder="CEP"
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
      />
    );
  }

  complement() {
    return (
      <input
        type="text"
        id="complement"
        name="complement"
        placeholder="Complemento"
      />
    );
  }

  num() {
    return (
      <input
        type="text"
        id="num"
        name="num"
        placeholder="Número"
      />
    );
  }

  city() {
    return (
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Cidade"
      />
    );
  }

  render() {
    const { cart } = this.props;
    const total = cart.reduce((acc, { price }) => (acc + price), 0).toFixed(2);
    return (
      <main>
        <header>
          <Link to="/">
            <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="voltar" />
          </Link>
        </header>
        <section>
          <h3>Finalizar Compras</h3>
          <div className="review-container">
            <h4>Revise seus Produtos</h4>
            <table>
              {cart.map(({ id, title, price }) => (
                <tr key={ id }>
                  <td><img src="https://img.icons8.com/windows/32/000000/checked--v1.png" alt="checked" /></td>
                  <td>{`${title}`}</td>
                  <td>R$: </td>
                  <td>{price}</td>
                </tr>
              ))}
            </table>
            <h4>
              Total: R$
              {total}
            </h4>
          </div>
          <div className="buyer-info-container">
            <h4>Informações do Comprador</h4>
            <div>
              {this.fullName()}
              {this.cpf()}
              {this.email()}
              {this.phone()}
              {this.zip()}
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
              <input type="radio" id="boleto" name="payment" />
              <img src="https://img.icons8.com/color/48/000000/boleto-bankario.png" alt="icon-boleto" />
            </div>
            <div>
              <p>Cartão de Crédito: </p>
              <input type="radio" id="visa" name="payment" />
              <span>Visa</span>
              <img src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" alt="icon-card" />
              <input type="radio" id="master" name="payment" />
              <span>Master</span>
              <img src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" alt="icon-card" />
              <input type="radio" id="elo" name="payment" />
              <span>Elo</span>
              <img src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" alt="icon-card" />
            </div>
          </div>
          <nav className="buttons-container">
            <button type="button" className="buy-button">
              Comprar
            </button>
          </nav>
        </section>
      </main>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Checkout;
