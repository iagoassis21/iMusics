import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumAtual: [],
      firstIndex: [],
      albumId: '',
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
  }

  getMusicsFromApi = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicsFromAlbumId = await getMusics(id);
    this.setState({
      albumAtual: musicsFromAlbumId,
      firstIndex: musicsFromAlbumId[0],
      albumId: musicsFromAlbumId[0].collectionId,
    });
  };

  render() {
    const { albumAtual, firstIndex, albumId } = this.state;
    return (
      <div data-testid="page-album">
        {
          <section>
            <img src={ firstIndex.artworkUrl100 } alt={ firstIndex.collectionName } />
            <p data-testid="album-name">
              {' '}
              { firstIndex.collectionName }
              {' '}
            </p>
            <p data-testid="artist-name">
              {' '}
              { firstIndex.artistName }
              {' '}
            </p>
          </section>
        }

        {
          albumAtual.slice(1).map((music, index) => (
            <MusicCard
              albumId={ albumId }
              trackIndex={ index }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              key={ music.trackName }
            />
          ))
        }
      </div>
    );
  }
}

Album.defaultProps = {
  match: {},
};

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default Album;
