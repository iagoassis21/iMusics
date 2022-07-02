import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateSubmitBtn = () => {
    const minLength = 2;
    const { artistName } = this.state;
    if (artistName.length >= minLength) {
      return false;
    }
    return true;
  };

  render() {
    const { artistName } = this.state;
    return (
      <div className="mainDivSearch" data-testid="page-search">
        <form>
          <label htmlFor="inputSerchId">
            <input
              name="artistName"
              value={ artistName }
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              id="inputSerchId"
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            className="loginBtn"
            disabled={ this.validateSubmitBtn() }
          >
            Procurar
          </button>
        </form>

      </div>
    );
  }
}

export default Search;
