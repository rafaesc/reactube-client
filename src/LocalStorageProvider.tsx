import * as React from "react";
import { IVideoClip, IVideoClipOptional } from "./components";
import {
  findVideoClipIndexForId,
  copy,
  getStorage,
  setStorage,
  cleanDeprecatedStorage,
  arrayShuffle
} from "./utils";
import db from "./db";

const NAME_LOCALSTORAGE = "dbYoutubeReact";
const VERSION_LOCALSTORAGE = "1";

const KEY_LOCALSTORAGE = NAME_LOCALSTORAGE + VERSION_LOCALSTORAGE;

const Context = React.createContext({});

export interface IState {
  playlist: IVideoClip[];
}

export interface ILocalStorageProvider extends IState {
  resetDatabase: () => void;
  removePlaylistItem: (id: string) => void;
  setVideoClip: (id: string, videoClip: IVideoClipOptional) => void;
  addVideoClip: (videoClip: IVideoClip) => void;
}

export default class LocalStorageProvider extends React.Component<any, IState> {
  public static Consumer = Context.Consumer;

  constructor(props) {
    super(props);

    let playlist: IVideoClip[];

    const cachePlaylist = getStorage(KEY_LOCALSTORAGE);
    cleanDeprecatedStorage(NAME_LOCALSTORAGE, VERSION_LOCALSTORAGE);
    if (cachePlaylist) {
      playlist = cachePlaylist;
    } else {
      playlist = copy(arrayShuffle(db));
      setStorage(KEY_LOCALSTORAGE, playlist);
    }
    this.state = {
      playlist
    };
  }

  public resetDatabase = () => {
    this.setState(
      {
        playlist: copy(arrayShuffle(db))
      },
      this.updateStorage
    );
  };

  public removePlaylistItem = (id: string) => {
    const playlist = this.state.playlist.filter(item => item.id !== id);
    this.setState({ playlist }, this.updateStorage);
  };

  public addPlaylistItem = (videoClip: IVideoClip) => {
    const list = this.state.playlist.slice();
    list.push(videoClip);

    this.setState(
      {
        playlist: list
      },
      this.updateStorage
    );
  };

  public updatePlaylistItem = (id: string, videoClip: IVideoClipOptional) => {
    const playlist = this.state.playlist.slice();
    const index = findVideoClipIndexForId(playlist, id);
    playlist[index] = {
      ...playlist[index],
      ...videoClip
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
      addVideoClip: this.addPlaylistItem,
      removePlaylistItem: this.removePlaylistItem,
      resetDatabase: this.resetDatabase,
      setVideoClip: this.updatePlaylistItem
    };

    return <Context.Provider value={value} {...this.props} />;
  }

  private updateStorage = () => {
    setStorage(KEY_LOCALSTORAGE, this.state.playlist);
  };
}
