import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      loading: '',
      firstLoad: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateSubmitBtn = () => {
    const minLength = 3;
    const { loginName } = this.state;
    if (loginName.length >= minLength) {
      return false;
    }
    return true;
  }

  onClickBtn = async (e) => {
    e.preventDefault();
    this.setState(
      { loading: '', firstLoad: false },
      async () => {
        const { loginName } = this.state;
        const check = await createUser({ name: loginName });
        console.log(check);
        this.setState({
          loading: check,
        });
      },
    );
  }

  render() {
    // Se você estiver vendo isso, me ajude a simplificar essa lógica, obg :D
    const { loginName, loading, firstLoad } = this.state;
    const showLoading = <Loading />;
    const loginForm = (
      <form className="formLogin">
        <label htmlFor="nameId">
          Insira seu nome
          <input
            className="inputLogin"
            name="loginName"
            value={ loginName }
            onChange={ this.handleChange }
            data-testid="login-name-input"
            id="nameId"
            type="text"
          />
        </label>
        <button
          className="loginBtn"
          disabled={ this.validateSubmitBtn() }
          onClick={ this.onClickBtn }
          data-testid="login-submit-button"
          type="submit"
          id="loginBtn"
        >
          Entrar
        </button>
      </form>
    );
    return (
      <div className="mainDivLogin" data-testid="page-login">
        {
          firstLoad ? loginForm : showLoading
        }
        {
          loading === 'OK' ? <Redirect to="/search" /> : ''
        }
      </div>
    );
  }
}

export default Login;
