import * as React from "react";
import { IPlaylistItem, IPlaylistItemOptional } from "./components";
import { findIndexPlaylistForId, copy, getStorage, setStorage } from "./utils";
import db from "./db";

const KEY_LOCALSTORAGE = "dbYoutubeReact";
const Context = React.createContext({});

export interface IState {
  playlist: IPlaylistItem[];
}

export interface ILocalStorageProvider extends IState {
  resetDatabase: () => void;
  removePlaylistItem: (id: string) => void;
  updatePlaylistItem: (id: string, playlist: IPlaylistItemOptional) => void;
  addPlaylistItem: (playlist: IPlaylistItem) => void;
}

export default class LocalStorageProvider extends React.Component<any, IState> {
  public static Consumer = Context.Consumer;

  constructor(props) {
    super(props);

    let playlist: IPlaylistItem[];
    const cachePlaylist = getStorage(KEY_LOCALSTORAGE);
    if (cachePlaylist) {
      playlist = cachePlaylist;
    } else {
      playlist = copy(db);
      setStorage(KEY_LOCALSTORAGE, playlist);
    }
    this.state = {
      playlist
    };
  }

  public resetDatabase = () => {
    this.setState(
      {
        playlist: copy(db)
      },
      this.updateStorage
    );
  };

  public removePlaylistItem = (id: string) => {
    const playlist = this.state.playlist.filter(item => item.id !== id);
    this.setState({ playlist }, this.updateStorage);
  };

  public addPlaylistItem = (playlist: IPlaylistItem) => {
    const list = this.state.playlist.slice();
    list.push(playlist);

    this.setState(
      {
        playlist: list
      },
      this.updateStorage
    );
  };

  public updatePlaylistItem = (id: string, item: IPlaylistItemOptional) => {
    const playlist = this.state.playlist.slice();
    const index = findIndexPlaylistForId(playlist, id);
    playlist[index] = {
      ...playlist[index],
      ...item
    };

    this.setState(
      {
        playlist
      },
      this.updateStorage
    );
  };

  public render() {
    const value: ILocalStorageProvider = {
      ...this.state,
      addPlaylistItem: this.addPlaylistItem,
      removePlaylistItem: this.removePlaylistItem,
      resetDatabase: this.resetDatabase,
      updatePlaylistItem: this.updatePlaylistItem
    };

    return <Context.Provider value={value} {...this.props} />;
  }

  private updateStorage = () => {
    setStorage(KEY_LOCALSTORAGE, this.state.playlist);
  };
}
