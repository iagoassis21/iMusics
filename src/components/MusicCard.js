import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorited: false,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  getFavSongs = async () => {
    const { trackId } = this.props;
    this.setState((prevState) => ({ favorited: !prevState, loading: true }),
      async () => {
        const getObjectMusic = await getMusics(trackId);
        await addSong(getObjectMusic);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorited, loading } = this.state;
    return (
      <section>
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
            {
              loading && <Loading />
            }
          </form>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
