import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorited: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.checkSomething();
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  getFavSongs = async () => {
    this.setState((prevState) => ({ favorited: !prevState, loading: true }),
      async () => {
        const { updateFavoriteList, previewUrl, trackId, trackName } = this.props;
        const { favorited } = this.state;
        if (favorited) {
          await addSong({
            previewUrl,
            trackId,
            trackName,
          });
        } else {
          updateFavoriteList();
          await removeSong({
            previewUrl,
            trackId,
            trackName,
          });
        }
        updateFavoriteList();
        this.setState({
          loading: false,
        });
      });
  }

  checkSomething = () => {
    const { favoritedSongs, trackId } = this.props;
    const check = favoritedSongs.some((track) => track.trackId === trackId);
    this.setState({
      favorited: check,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorited, loading } = this.state;
    const TUDO = (
      <div>
        <p>
          {' '}
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <form>
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              name="favorited"
              onChange={ this.handleChange }
              checked={ favorited }
              onClick={ this.getFavSongs }
              id={ trackId }
              type="checkbox"
            />
          </label>
        </form>
      </div>
    );
    return (
      <section>
        {
          loading ? <Loading /> : TUDO
        }
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  updateFavoriteList: PropTypes.func.isRequired,
  favoritedSongs: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default MusicCard;
