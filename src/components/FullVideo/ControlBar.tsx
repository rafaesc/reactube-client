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

export default class ControlBar extends React.Component<IProps> {
  public render() {
    const { currentTime, duration } = this.props.provider;
    const totalTimeFormat = formatTime(duration);
    const currentTimeFormat = formatTime(currentTime, duration);
    return (
      <ControlBarStyled>
        <ControlBarGradientStyled />
        <ControlBarTopStyled>
          <ProgressControl {...this.props} />
          <FragmentControl {...this.props} />
        </ControlBarTopStyled>
        <ControlBarBottomStyled>
          <ControlBarBottomSideStyled>
            <BackButton {...this.props} />
            <PlayToggle {...this.props} />
            <NextButton {...this.props} />
            <VolumeMenuButton {...this.props} />
            <TextPlayerStyled>
              {currentTimeFormat} / {totalTimeFormat}
            </TextPlayerStyled>
          </ControlBarBottomSideStyled>
          <ControlBarBottomSideStyled>
            <FullscreenToggle {...this.props} />
            <EditButton {...this.props} />
          </ControlBarBottomSideStyled>
        </ControlBarBottomStyled>
      </ControlBarStyled>
    );
  }
}
