import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { PlayerButtonStyled } from "./styles";

interface IPropsCompound extends IProps {
  value: "next" | "back";
  children: any;
}

const CompoundPlaylistButton: React.SFC<IPropsCompound> = props => {
  const { value, onClickPlaylistAction, nextVideoClip, backVideoClip } = props;
  const sendVideoClip = value === "next" ? nextVideoClip : backVideoClip;
  const visible = !!sendVideoClip;

  if (visible && onClickPlaylistAction) {
    return (
      visible && (
        <PlayerButtonStyled
          onClick={onClickPlaylistAction.bind(null, sendVideoClip)}
        >
          {props.children}
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
