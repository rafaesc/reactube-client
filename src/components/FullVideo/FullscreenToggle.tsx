import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { PlayerButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

export default class PlayToggle extends React.Component<IProps> {
  public handleClick = () => {
    const { toggleFullscreen, video } = this.props;
    toggleFullscreen(video);
  };
  public render() {
    const { fullscreen } = this.props.provider;

    return (
      <PlayerButtonStyled tabIndex={0} onClick={this.handleClick}>
        {fullscreen ? (
          <i className="fas fa-compress" />
        ) : (
          <i className="fas fa-expand" />
        )}
      </PlayerButtonStyled>
    );
  }
}
