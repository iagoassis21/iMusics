import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumAtual: [],
      firstIndex: [],
      favoritedSongs: [],
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
  }

  getMusicsFromApi = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicsFromAlbumId = await getMusics(id);
    const getfavorites = await getFavoriteSongs();
    this.setState({
      albumAtual: musicsFromAlbumId,
      firstIndex: musicsFromAlbumId[0],
      favoritedSongs: getfavorites,
    });
  };

  render() {
    const { albumAtual, firstIndex, favoritedSongs } = this.state;
    return (
      <div data-testid="page-album">
        {
          <section>
            <img src={ firstIndex.artworkUrl100 } alt={ firstIndex.collectionName } />
            <p data-testid="album-name">
              { firstIndex.collectionName }
            </p>
            <p data-testid="artist-name">
              { firstIndex.artistName }
            </p>
          </section>
        }

        {
          albumAtual.slice(1).map((music) => (
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              key={ music.trackName }
              favoritedSongs={ favoritedSongs }
              updateFavoriteList={ () => { } }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default Album;
