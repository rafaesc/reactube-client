import * as React from "react";
import ControlBar from "./ControlBar";
import LoadingSpinner from "./LoadingSpinner";
import ComingNext from "./ComingNext";
import Shortcut from "./Shortcut";
import Video from "./Video";
import { IPlaylistItem } from "../types";
import FullVideoProvider, { IFullVideoProvider } from "./Provider";

import { FullVideoStyled, TitleStyled } from "./styles";
import BigPlayButton from "./BigPlayButton";

export interface IExternalProps {
  autoPlay?: boolean;
  autoPlaylist?: boolean;
  currentVideo: IPlaylistItem;
  nextVideo?: IPlaylistItem;
  updatedTimeFragment: (startTime: number, endTime: number) => void;
  setAutoPlay?: (autoPlaylist: boolean) => void;
  onPlaylistAction?: (value: "next" | "back") => void;
  children?: any;
}

export interface IProps extends IExternalProps, IFullVideoProvider {}

export interface IPropsChildrens extends IProps {
  video: any;
}

class FullVideo extends React.Component<IProps> {
  public video: Video;
  public controlsHideTimer: any;

  public startControlsTimer = () => {
    const { userActivate } = this.props;
    userActivate(true);
    clearTimeout(this.controlsHideTimer);
    this.controlsHideTimer = setTimeout(() => {
      userActivate(false);
    }, 3000);
  };

  public handleFocus = () => {
    this.props.playerActivate(true);
  };

  public handleBlur = () => {
    this.props.playerActivate(false);
  };

  public render() {
    const provider = this.props.provider;
    const { fullscreen } = provider;
    const {
      currentVideo: { src, id, title }
    } = this.props;

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
