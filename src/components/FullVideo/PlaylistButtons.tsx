import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { PlayerButtonStyled } from "./styles";

interface IPropsCompound extends IProps {
  value: "next" | "back";
  children: any;
}

const CompoundPlaylistButton: React.SFC<IPropsCompound> = props => {
  const { children, onClickPlaylistAction } = props;
  if (onClickPlaylistAction) {
    const handleClick = () => {
      const { value } = props;
      onClickPlaylistAction(value);
    };

    return (
      onClickPlaylistAction && (
        <PlayerButtonStyled onClick={handleClick}>
          {children}
        </PlayerButtonStyled>
      )
    );
  }
  return null;
};

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

export const NextButton: React.SFC<IProps> = props => (
  <CompoundPlaylistButton {...props} value="next">
    <i className="fas fa-step-forward" />
  </CompoundPlaylistButton>
);
export const BackButton: React.SFC<IProps> = props => (
  <CompoundPlaylistButton {...props} value="back">
    <i className="fas fa-step-backward" />
  </CompoundPlaylistButton>
);
