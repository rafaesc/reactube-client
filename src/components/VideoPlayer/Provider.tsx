import * as React from "react";
import { IVideoClip } from "../types";
import { getStorage, setStorage } from "../../utils";

const KEY_LOCALSTORAGE = "dbActionsReact";
const Context = React.createContext({});

interface IState {
  autoPlaylist: boolean;
  playlistItem: IVideoClip | null;
  repeat: boolean;
  theaterMode: boolean; // theater Mode TODO:
}

export interface IVideoPlayerProvider extends IState {
  setAutoPlay: (autoPlay: boolean) => void;
  setPlaylistItem: (playlistItem: IVideoClip) => void;
  setRepeat: (repeat: boolean) => void;
  setTheaterMode: (theaterMode: boolean) => void;
}

export default class VideoPlayerProvider extends React.Component<any, IState> {
  public static Consumer = Context.Consumer;

  constructor(props: any) {
    super(props);

    let state: IState;
    const cacheState = getStorage(KEY_LOCALSTORAGE);
    if (cacheState) {
      state = cacheState;
    } else {
      state = {
        autoPlaylist: true,
        playlistItem: null,
        repeat: false,
        theaterMode: false
      };
      setStorage(KEY_LOCALSTORAGE, state);
    }
    this.state = state;
  }

  public setRepeat = (repeat: boolean) => {
    this.setState({ repeat }, this.updateStorage);
  };

  public setAutoPlay = (autoPlaylist: boolean) => {
    this.setState({ autoPlaylist }, this.updateStorage);
  };

  public setPlaylistItem = (playlistItem: IVideoClip) => {
    this.setState({ playlistItem }, this.updateStorage);
  };

  public setTheaterMode = (theaterMode: boolean) => {
    this.setState({ theaterMode }, this.updateStorage);
  };

  public render() {
    const value: IVideoPlayerProvider = {
      ...this.state,
      setAutoPlay: this.setAutoPlay,
      setPlaylistItem: this.setPlaylistItem,
      setRepeat: this.setRepeat,
      setTheaterMode: this.setTheaterMode
    };

    return <Context.Provider value={value} {...this.props} />;
  }

  private updateStorage = () => {
    setStorage(KEY_LOCALSTORAGE, this.state);
  };
}
