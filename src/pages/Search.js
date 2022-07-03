import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      loading: false,
      resultSearch: [],
      entrouaqui: false,
      artistAtual: '',
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

  onClickBtn = () => {
    const { artistName } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const result = await searchAlbumsAPI(artistName);
        this.setState({
          artistAtual: artistName,
          artistName: '',
          resultSearch: result,
          entrouaqui: true,
          loading: false,
        });
      },
    );
  }

  render() {
    const { artistName, loading, resultSearch, entrouaqui, artistAtual } = this.state;
    const searchForm = (
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
          type="button"
          data-testid="search-artist-button"
          className="loginBtn"
          disabled={ this.validateSubmitBtn() }
          onClick={ this.onClickBtn }
        >
          Procurar
        </button>
      </form>
    );
    const resultTag = (
      <p>
        {
          resultSearch.length === 0
            ? 'Nenhum álbum foi encontrado'
            : `Resultado de álbuns de: ${artistAtual}`
        }
      </p>
    );

    return (
      <div className="mainDivSearch" data-testid="page-search">
        <div className="searchForm">
          {
            loading ? <Loading /> : searchForm
          }
          {
            entrouaqui ? resultTag : null
          }
        </div>

        <div className="albumCards">
          {
            resultSearch.map((album) => (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `album/${album.collectionId}` }
                key={ album.collectionId }
              >
                <div className="albumCard">
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionName }
                  />
                  <p>
                    {' '}
                    { album.collectionName }
                  </p>
                  <p>
                    {album.artistName }
                  </p>
                </div>

              </Link>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Search;
