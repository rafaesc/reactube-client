import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { PlayerButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

export default class PlayToggle extends React.Component<IProps> {
  public handleClick = () => {
    const { video } = this.props;
    video.togglePlay();
  };
  public render() {
    const { paused } = this.props.provider;

    return (
      <PlayerButtonStyled
        paused={paused}
        tabIndex={0}
        onClick={this.handleClick}
      >
        {paused ? (
          <i className="fas fa-play" />
        ) : (
          <i className="fas fa-pause" />
        )}
      </PlayerButtonStyled>
    );
  }
}
