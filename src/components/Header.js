import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nameUserValue: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserNameValue();
  }

  getUserNameValue = async () => {
    const getNameValueInPromisse = await getUser();
    const getNameValue = await (getNameValueInPromisse);
    const getNameKey = Object.values(getNameValue)[0];
    this.setState({
      nameUserValue: getNameKey,
      loading: false,
    });
  }

  render() {
    const { nameUserValue, loading } = this.state;
    const showUserName = (
      <div className="userNameInHeader" data-testid="header-user-name">
        { nameUserValue }
      </div>
    );
    return (
      <header className="mainHeader" data-testid="header-component">
        <div className="trybeTunesTitle">Trybe Tunes</div>
        {
          loading ? <Loading /> : showUserName
        }
        <nav className="mainNav">
          <Link
            className="navSearch"
            data-testid="link-to-search"
            to="/search"
          >
            Search
          </Link>
          <Link
            className="navFavorites"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites
          </Link>
          <Link
            className="navProfile"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
