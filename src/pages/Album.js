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
    });
  };

  render() {
    const { albumAtual, firstIndex } = this.state;
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
          albumAtual.slice(1).map((music) => (
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
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
