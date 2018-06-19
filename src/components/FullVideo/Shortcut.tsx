import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromPlayer } from "./FullVideo";

interface IProps extends IPropsFromPlayer {
  video: Video;
}

interface IHandleKeyCode {
  handle: any;
  keyCode: number;
}

export default class Shortcut extends React.Component<IProps> {
  public handleKeycodes: IHandleKeyCode[];

  constructor(props) {
    super(props);
    this.handleKeycodes = [
      {
        handle: this.togglePlay,
        keyCode: 32 // spacebar
      },
      {
        handle: this.leftArrow,
        keyCode: 37 // Left arrow
      },
      {
        handle: this.rightArrow,
        keyCode: 39 // Right arrow
      },
      {
        handle: this.upArrow,
        keyCode: 38 // Up arrow
      },
      {
        handle: this.downArrow,
        keyCode: 40 // Down arrow
      }
    ];
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  public handleKeyPress = e => {
    const { isActive } = this.props.provider

    if (!isActive) {
      return
    }
    const keyCode = e.keyCode || e.which;

    const shortcut = this.handleKeycodes.filter(handle => {
      if (!handle.keyCode || handle.keyCode - keyCode !== 0) {
        return false;
      }
      return true;
    })[0];

    if (shortcut) {
      shortcut.handle();
      e.preventDefault();
    }
  };

  public togglePlay = () => {
    this.props.video.togglePlay();
  };

  public leftArrow = () => {
    this.props.video.replay(5);
  };

  public rightArrow = () => {
    this.props.video.forward(5);
  };

  public upArrow = () => {
    const { video } = this.props;
    let volume = video.volume + 0.05;
    if (volume > 1) {
      volume = 1;
    }
    video.volume = volume;
    this.checkMuted();
  };

  public downArrow = () => {
    const { video } = this.props;
    let volume = video.volume - 0.05;
    if (volume < 0) {
      volume = 0;
    }
    video.volume = volume;
    this.checkMuted();
  };

  public checkMuted() {
    const { video } = this.props;
    if (video.volume === 0) {
      video.muted = true;
    } else {
      video.muted = false;
    }
  }

  public render() {
    return null;
  }
}
