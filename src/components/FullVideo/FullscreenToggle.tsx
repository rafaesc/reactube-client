import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { PlayerButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const PlayToggle: React.SFC<IProps> = props => {
  const handleClick = () => {
    const { toggleFullscreen, video } = props;
    toggleFullscreen(video);
  };

  const { fullscreen } = props.provider;

  return (
    <PlayerButtonStyled tabIndex={0} onClick={handleClick}>
      {fullscreen ? (
        <i className="fas fa-compress" />
      ) : (
        <i className="fas fa-expand" />
      )}
    </PlayerButtonStyled>
  );
};

export default PlayToggle;
