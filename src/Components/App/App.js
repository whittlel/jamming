//import logo from './logo.svg';
import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

const song = {
  name: "namee",
  artist: "artistt",
  album: "albumm",
  id: "eyedee",
};

//const playlistName = "Jamming Playlist";
//const playlistTracks = [song];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "Jamming Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    //console.log("Search term: " + searchTerm);
    Spotify.search(searchTerm).then((searchResponse) => {
      this.setState({ searchResults: searchResponse });
    });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map((track) => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currTrack) => currTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  addTrack(track) {
    //check if the track already exists in the playlist
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return; //break, we already have track.
    }
    this.setState((prevState) => ({
      playlistTracks: [...prevState.playlistTracks, track],
    }));
    //this.state.playlistTracks.push(track); this is wrong.
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
