import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { BigPlayButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const BigPlayButton: React.SFC<IProps> = props => {
  const handleClick = () => {
    const { video } = props;
    video.togglePlay();
  };

  return <BigPlayButtonStyled onClick={handleClick} />;
};

export default BigPlayButton;
