import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      allFavoritedSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.showFavoriteSongs();
  }

  showFavoriteSongs = async () => {
    this.setState(
      { loading: false },
      async () => {
        const get = await getFavoriteSongs();
        this.setState({
          allFavoritedSongs: get,
          loading: false,
        });
      },
    );
  }

  render() {
    const { allFavoritedSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <section>
          {
            loading ? <Loading />
              : allFavoritedSongs.map((favSongs) => (
                <MusicCard
                  trackName={ favSongs.trackName }
                  previewUrl={ favSongs.previewUrl }
                  trackId={ favSongs.trackId }
                  key={ favSongs.trackId }
                  updateFavoriteList={ this.showFavoriteSongs }
                  favoritedSongs={ allFavoritedSongs }
                />))
          }
        </section>
      </div>
    );
  }
}

export default Favorites;
