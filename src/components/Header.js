import React from 'react';
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
    console.log(getNameKey);
    this.setState({
      nameUserValue: getNameKey,
      loading: false,
    });
  }

  render() {
    const { nameUserValue, loading } = this.state;
    const showUserName = (
      <p data-testid="header-user-name">
        { nameUserValue }
      </p>
    );
    return (
      <header className="mainHeader" data-testid="header-component">
        <div>
          <p>Trybe Tunes</p>
          {
            loading ? <Loading /> : showUserName
          }
        </div>
      </header>
    );
  }
}

export default Header;
