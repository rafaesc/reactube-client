import * as React from "react";
import * as ReactDOM from "react-dom";
import Video from "./Video";
import { setStorage, getStorage } from "../../utils";

const Context = React.createContext({});

const KEY_LOCALSTORAGE = "dbVolumeReact";

interface IState {
  autoPaused: boolean;
  buffered: any;
  currentSrc: any;
  currentTime: number;
  duration: number;
  editActive: boolean;
  editMax: number;
  editMin: number;
  ended: boolean;
  fullscreen: boolean;
  hasStarted: boolean;
  isActive: boolean;
  muted: boolean;
  paused: boolean;
  readyState: number;
  seeking: boolean;
  seekingTime: number;
  userActivity: boolean;
  video: any;
  videoHeight: number;
  videoWidth: number;
  volume: number;
  waiting: boolean;
}

export interface IFullVideoProvider {
  provider: IState;
  editing: (ob: boolean) => any;
  changeVolume: (ob: any) => any;
  editingValues: (ob: any) => any;
  userActivate: (ob: boolean) => any;
  playerActivate: (ob: boolean) => any;
  seekingTime: (ob: number) => any;
  endSeeking: () => any;
  toggleFullscreen: (video: Video) => any;
  onLoadStart: (ob: any) => any;
  canPlay: (ob: any) => any;
  waiting: (ob: any) => any;
  playing: (ob: any) => any;
  play: (ob: any, autoPlay?: boolean) => any;
  pause: (ob: any) => any;
  end: (ob: any) => any;
  seeked: (ob: any) => any;
  seeking: (ob: any) => any;
  reload: (ob: any) => any;
}

export default class FullVideoProvider extends React.Component<any, IState> {
  public static Consumer = Context.Consumer;

  constructor(props: any) {
    super(props);

    let volume: number;
    const volumeCache = getStorage(KEY_LOCALSTORAGE);
    if (volumeCache !== undefined) {
      volume = volumeCache;
    } else {
      volume = 1;
      setStorage(KEY_LOCALSTORAGE, volume);
    }
    this.state = {
      autoPaused: false,
      buffered: null,
      currentSrc: null,
      currentTime: 0,
      duration: 0,
      editActive: false,
      editMax: 0,
      editMin: 0,
      ended: false,
      fullscreen: false,
      hasStarted: false,
      isActive: false,
      muted: false,
      paused: true,
      readyState: 0,
      seeking: false,
      seekingTime: 0,
      userActivity: false,
      video: null,
      videoHeight: 0,
      videoWidth: 0,
      volume,
      waiting: false
    };
  }

  public toggleFullscreen = (video: Video) => {
    const videoElement = ReactDOM.findDOMNode(video);
    const fullscreen = this.state.fullscreen;
    if (fullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this.setState({ fullscreen: false });
    } else {
      if (videoElement && videoElement.parentElement) {
        const fullvideoElement = videoElement.parentElement;
        if (fullvideoElement.requestFullscreen) {
          fullvideoElement.requestFullscreen();
        } else if (fullvideoElement.webkitRequestFullscreen) {
          fullvideoElement.webkitRequestFullscreen();
        }
        this.setState({ fullscreen: true });
      }
    }
  };

  public editing = (editActive: boolean) => {
    this.setState({ editActive });
  };

  public editingValues = (editActive: { editMin: number; editMax: number }) => {
    this.setState(editActive);
  };

  public userActivate = (userActivity: boolean) => {
    this.setState({ userActivity });
  };

  public playerActivate = (isActive: boolean) => {
    this.setState({ isActive });
  };

  public seekingTime = (time: number) => {
    this.setState({ seekingTime: time });
  };

  public endSeeking = () => {
    this.setState({ seekingTime: 0 });
  };

  public onLoadStart = (videoProps: any) => {
    this.setState({
      ...videoProps,
      editActive: false,
      ended: false,
      hasStarted: false,
      waiting: true
    });
  };

  public canPlay = (videoProps: any) => {
    this.setState({ ...videoProps, waiting: false });
  };

  public waiting = (videoProps: any) => {
    this.setState({ ...videoProps, waiting: true });
  };

  public playing = (videoProps: any) => {
    this.setState({ ...videoProps, waiting: false });
  };

  public play = (videoProps: any) => {
    this.setState({
      ...videoProps,
      autoPaused: false,
      ended: false,
      hasStarted: true,
      paused: false,
      waiting: false
    });
  };

  public pause = (videoProps: any) => {
    this.setState({ ...videoProps, paused: true });
  };

  public end = (videoProps: any) => {
    this.setState({ ...videoProps, ended: true });
  };

  public seeking = (videoProps: any) => {
    this.setState({ ...videoProps, seeking: true });
  };

  public seeked = (videoProps: any) => {
    this.setState({ ...videoProps, seeking: false });
  };

  public changeVolume = (videoProps: any) => {
    this.setState(
      {
        ...this.state,
        ...videoProps
      },
      this.updateStorage
    );
  };

  public reload = (videoProps: any) => {
    const newState = {
      ...this.state,
      ...videoProps
    };
    if (videoProps.paused === false) {
      newState.hasStarted = true;
      newState.waiting = false;
    }
    this.setState(newState);
  };

  public render() {
    const value: IFullVideoProvider = {
      canPlay: this.canPlay,
      changeVolume: this.changeVolume,
      editing: this.editing,
      editingValues: this.editingValues,
      end: this.end,
      endSeeking: this.endSeeking,
      onLoadStart: this.onLoadStart,
      pause: this.pause,
      play: this.play,
      playerActivate: this.playerActivate,
      playing: this.playing,
      provider: this.state,
      reload: this.reload,
      seeked: this.seeked,
      seeking: this.seeking,
      seekingTime: this.seekingTime,
      toggleFullscreen: this.toggleFullscreen,
      userActivate: this.userActivate,
      waiting: this.waiting
    };
    return <Context.Provider value={value} {...this.props} />;
  }

  private updateStorage = () => {
    setStorage(KEY_LOCALSTORAGE, this.state.volume);
  };
}
