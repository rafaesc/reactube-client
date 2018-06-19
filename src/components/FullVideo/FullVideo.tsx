import * as React from "react";
import ControlBar from "./ControlBar";
import LoadingSpinner from "./LoadingSpinner";
import ComingNext from "./ComingNext";
import Shortcut from "./Shortcut";
import Video from "./Video";
import { IVideoClip, IVideoClipOptional } from "../types";
import FullVideoProvider, { IFullVideoProvider } from "./Provider";

import { FullVideoStyled, TitleStyled } from "./styles";
import BigPlayButton from "./BigPlayButton";

export interface IExternalProps {
  autoPlay?: boolean;
  autoPlaylist?: boolean;
  currentVideoClip?: IVideoClip;
  nextVideoClip?: IVideoClip;
  onChangeTimeFragment: (startTime: number, endTime: number) => void;
  onChangeAutoPlay?: (autoPlaylist: boolean) => void;
  onClickPlaylistAction?: (value: "next" | "back") => void;
  children?: any;
}

export interface IProps extends IExternalProps, IFullVideoProvider {
  currentVideoClip: IVideoClip;
}

interface IDefaultProps {
  currentVideoClip: IVideoClipOptional;
}

export interface IPropsChildrens extends IProps {
  video: any;
}

class FullVideo extends React.Component<IProps> {
  public static defaultProps: IDefaultProps = {
    currentVideoClip: {
      id: "",
      src: "",
      startTime: 0
    }
  };

  public video: Video;
  public controlsHideTimer: any;

  public startControlsTimer = () => {
    const { userActivate } = this.props;
    userActivate(true);
    clearTimeout(this.controlsHideTimer);
    this.controlsHideTimer = setTimeout(() => {
      userActivate(false);
    }, 1500);
  };

  public handleFocus = () => {
    this.props.playerActivate(true);
  };

  public handleBlur = () => {
    this.props.playerActivate(false);
  };

  public render() {
    const provider = this.props.provider;
    const { fullscreen, userActivity, paused } = provider;
    const { src, id, title } = this.props.currentVideoClip;

    const thereIsId = id !== "";

    const propsWithoutChildren: IProps = {
      ...this.props,
      children: null
    };

    const propsActionChildren: IPropsChildrens = {
      ...propsWithoutChildren,
      video: this.video ? this.video : null
    };

    return (
      <FullVideoStyled
        fullscreen={fullscreen}
        showControls={userActivity || paused}
        onTouchStart={this.startControlsTimer}
        onMouseDown={this.startControlsTimer}
        onMouseMove={this.startControlsTimer}
        onKeyDown={this.startControlsTimer}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {title && <TitleStyled>{title}</TitleStyled>}
        <Video
          ref={(c: any) => {
            this.video = c;
          }}
          {...propsWithoutChildren}
        >
          <source src={src + "?id=" + id} />
        </Video>
        <BigPlayButton {...propsActionChildren} />
        <ComingNext {...propsActionChildren} />
        {thereIsId && <LoadingSpinner {...propsActionChildren} />}
        {thereIsId && <ControlBar {...propsActionChildren} />}
        <Shortcut {...propsActionChildren} />
      </FullVideoStyled>
    );
  }
}

export default (props: IExternalProps | any) => (
  <FullVideoProvider>
    <FullVideoProvider.Consumer>
      {(value: any) => <FullVideo {...props} {...value} />}
    </FullVideoProvider.Consumer>
  </FullVideoProvider>
);
