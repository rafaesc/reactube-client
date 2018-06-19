import * as React from "react";
import FragmentControl from "./FragmentControl";
import EditButton from "./EditButton";
import VolumeMenuButton from "./VolumeMenuButton";
import { BackButton, NextButton } from "./PlaylistButtons";
import FullscreenToggle from "./FullscreenToggle";
import PlayToggle from "./PlayToggle";
import ProgressControl from "./ProgressControl";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import {
  ControlBarStyled,
  ControlBarGradientStyled,
  ControlBarBottomStyled,
  ControlBarBottomSideStyled,
  ControlBarTopStyled,
  TextPlayerStyled
} from "./styles";
import { formatTime } from "../../utils";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const ControlBar: React.SFC<IProps> = props => {
  const { currentTime, duration } = props.provider;
  const totalTimeFormat = formatTime(duration);
  const currentTimeFormat = formatTime(currentTime, duration);

  return (
    <ControlBarStyled>
      <ControlBarGradientStyled />
      <ControlBarTopStyled>
        <ProgressControl {...props} />
        <FragmentControl {...props} />
      </ControlBarTopStyled>
      <ControlBarBottomStyled>
        <ControlBarBottomSideStyled>
          <BackButton {...props} />
          <PlayToggle {...props} />
          <NextButton {...props} />
          <VolumeMenuButton {...props} />
          <TextPlayerStyled>
            {currentTimeFormat} / {totalTimeFormat}
          </TextPlayerStyled>
        </ControlBarBottomSideStyled>
        <ControlBarBottomSideStyled>
          <FullscreenToggle {...props} />
          <EditButton {...props} />
        </ControlBarBottomSideStyled>
      </ControlBarBottomStyled>
    </ControlBarStyled>
  );
};

export default ControlBar;
