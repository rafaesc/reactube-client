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
const VERSION_LOCALSTORAGE = "3";

const KEY_LOCALSTORAGE = NAME_LOCALSTORAGE + VERSION_LOCALSTORAGE;

const Context = React.createContext({});

export interface IState {
  idVideo: string;
  inFullPlayer: boolean;
  playlist: IVideoClip[];
  autoPlaylist: boolean;
  random: boolean;
  repeat: boolean;
  theaterMode: boolean; // TODO: theater Mode
}

export interface IAppProvider extends IState {
  resetDatabase: () => void;
  removePlaylistItem: (id: string) => void;
  setIdVideo: (idVideo: string) => void;
  setInFullPlayer: (inFullPlayer: boolean) => void;
  setVideoClip: (id: string, videoClip: IVideoClipOptional) => void;
  addVideoClip: (videoClip: IVideoClip) => void;
  setAutoPlaylist: (autoPlay: boolean) => void;
  setRandom: (random: boolean) => void;
  setRepeat: (repeat: boolean) => void;
  setTheaterMode: (theaterMode: boolean) => void;
}

export default class AppProvider extends React.Component<any, IState> {
  public static Consumer = Context.Consumer;

  constructor(props) {
    super(props);

    let state: IState;

    const cacheState = getStorage(KEY_LOCALSTORAGE);
    cleanDeprecatedStorage(NAME_LOCALSTORAGE, VERSION_LOCALSTORAGE);
    if (cacheState) {
      state = {
        ...cacheState,
        idVideo: ""
      };
    } else {
      state = {
        autoPlaylist: true,
        idVideo: "",
        inFullPlayer: false,
        playlist: copy(arrayShuffle(db)),
        random: false,
        repeat: false,
        theaterMode: false
      };
      setStorage(KEY_LOCALSTORAGE, state);
    }
    this.state = state;
  }

  public resetDatabase = () => {
    this.setState(
      {
        playlist: copy(arrayShuffle(db))
      },
      this.updateStorage
    );
  };

  public setIdVideo = (idVideo: string) => {
    this.setState({
      idVideo
    });
  };

  public setInFullPlayer = (inFullPlayer: boolean) => {
    this.setState({
      inFullPlayer
    });
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

  public setRepeat = (repeat: boolean) => {
    this.setState({ repeat }, this.updateStorage);
  };

  public setRandom = (random: boolean) => {
    this.setState({ random }, this.updateStorage);
  };

  public setAutoPlaylist = (autoPlaylist: boolean) => {
    this.setState({ autoPlaylist }, this.updateStorage);
  };

  public setTheaterMode = (theaterMode: boolean) => {
    this.setState({ theaterMode }, this.updateStorage);
  };

  public render() {
    const value: IAppProvider = {
      ...this.state,
      addVideoClip: this.addPlaylistItem,
      removePlaylistItem: this.removePlaylistItem,
      resetDatabase: this.resetDatabase,
      setAutoPlaylist: this.setAutoPlaylist,
      setIdVideo: this.setIdVideo,
      setInFullPlayer: this.setInFullPlayer,
      setRandom: this.setRandom,
      setRepeat: this.setRepeat,
      setTheaterMode: this.setTheaterMode,
      setVideoClip: this.updatePlaylistItem
    };

    return <Context.Provider value={value} {...this.props} />;
  }

  private updateStorage = () => {
    setStorage(KEY_LOCALSTORAGE, this.state);
  };
}
