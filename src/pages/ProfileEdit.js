import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      emailUser: '',
      imageUser: '',
      descriptionUser: '',
      updated: false,
    };
  }

  componentDidMount() {
    this.showUserProfile();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateSubmitBtn = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const { emailUser } = this.state;
    if (emailRegex.test(emailUser)) {
      return false;
    }
    return true;
  }

  showUserProfile = async () => {
    const check = await getUser();
    this.setState({
      nameUser: check.name,
      emailUser: check.email,
      imageUser: check.image,
      descriptionUser: check.description,
    });
  }

  updateUserProfile = async () => {
    const { nameUser, emailUser, imageUser, descriptionUser } = this.state;
    await updateUser({ name: nameUser,
      email: emailUser,
      image: imageUser,
      description: descriptionUser,
    });
  }

  handleSubmit = () => {
    this.updateUserProfile();
    this.setState({
      updated: true,
    });
  }

  render() {
    const { nameUser, emailUser, imageUser,
      descriptionUser, updated } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <form>
          <label htmlFor="imageId">
            Imagem
            <input
              data-testid="edit-input-image"
              id="imageId"
              name="imageUser"
              type="text"
              value={ imageUser }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="nameId">
            Nome
            <input
              data-testid="edit-input-name"
              id="nameId"
              name="nameUser"
              type="text"
              value={ nameUser }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="emailId">
            Email
            <input
              data-testid="edit-input-email"
              id="emailId"
              name="emailUser"
              type="text"
              value={ emailUser }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionId">
            Descrição
            <input
              data-testid="edit-input-description"
              id="descriptionId"
              name="descriptionUser"
              type="textarea"
              value={ descriptionUser }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            className="loginBtn"
            disabled={ this.validateSubmitBtn() }
            onClick={ this.handleSubmit }
            type="button"
            id="loginBtn"
          >
            Salvar
          </button>
        </form>
        {
          updated ? <Redirect to="/profile" /> : null
        }
      </div>
    );
  }
}

export default ProfileEdit;
