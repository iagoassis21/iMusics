import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      emailUser: '',
      imageUser: '',
      descriptionUser: '',
      loading: '',
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

  showUserProfile = async () => {
    const check = await getUser();
    this.setState({
      nameUser: check.name,
      emailUser: check.email,
      imageUser: check.image,
      descriptionUser: check.description,
    });
    if (check !== '') {
      this.setState({
        loading: check,
      });
    }
  }

  render() {
    const { nameUser, emailUser, imageUser, descriptionUser, loading } = this.state;
    const showInformations = (
      <div>
        <img data-testid="profile-image" src={ imageUser } alt="foto de perfil" />
        <p>
          { nameUser }
        </p>
        <p>
          { emailUser }
        </p>
        <p>
          { descriptionUser }
        </p>
      </div>
    );
    return (
      <div data-testid="page-profile">
        {
          loading === '' ? <Loading /> : showInformations
        }
        <nav>
          <Link
            className="navProfileEdit"
            to="/profile/edit"
          >
            Editar perfil
          </Link>
        </nav>
      </div>

    );
  }
}

export default Profile;
