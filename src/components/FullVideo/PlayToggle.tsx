import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { PlayerButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const PlayToggle: React.SFC<IProps> = props => {
  const handleClick = () => {
    const { video } = props;
    video.togglePlay();
  };

  const { paused } = props.provider;

  return (
    <PlayerButtonStyled paused={paused} tabIndex={0} onClick={handleClick}>
      {paused ? <i className="fas fa-play" /> : <i className="fas fa-pause" />}
    </PlayerButtonStyled>
  );
};

export default PlayToggle;
