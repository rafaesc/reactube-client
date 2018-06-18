import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { BigPlayButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

export default class BigPlayButton extends React.Component<IProps> {
  public handleClick = () => {
    const { video } = this.props;
    video.togglePlay();
  };

  public render() {
    const { currentSrc, userActivity } = this.props.provider;
    return (
      <BigPlayButtonStyled
        onClick={this.handleClick}
      />
    );
  }
}
