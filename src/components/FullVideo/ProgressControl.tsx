import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import Slider, { createSliderWithTooltip } from "rc-slider";
import { ProgressControlStyled } from "./styles";
import {
  convertToTimeRange,
  convertToTime,
  formatTooltipRange
} from "../../utils";

const SliderWithTooltip = createSliderWithTooltip(Slider);

interface IState {
  changed: boolean;
  value: number;
}

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

export default class PlayToggle extends React.Component<IProps, IState> {
  public state = {
    changed: false,
    value: 1000
  };

  public slideTime() {
    const { currentTime, duration } = this.props.provider;
    if (this.state.changed) {
      return this.state.value;
    }
    if (isNaN(duration) || duration === 0) {
      return 0;
    }
    return convertToTimeRange(currentTime, duration);
  }

  public handleChange = (value: number) => {
    this.setState({ changed: true, value });
  };

  public handleChangeComplete = (value: number) => {
    const {
      provider: { duration },
      currentVideoClip: { startTime, endTime }
    } = this.props;
    const selectedTime = convertToTime(value, duration);
    let seekTime;
    if (selectedTime >= startTime && selectedTime <= endTime) {
      seekTime = selectedTime;
    } else if (selectedTime < startTime) {
      seekTime = startTime;
    } else if (selectedTime > endTime) {
      seekTime = endTime;
    }
    this.props.video.seek(seekTime);
    this.setState({ changed: false, value });
  };

  public render() {
    const {
      provider: { duration, editActive },
      currentVideoClip: { startTime, endTime }
    } = this.props;

    return (
      <ProgressControlStyled show={editActive && duration}>
        <Slider
          max={1000}
          className="mark mark-start"
          value={convertToTimeRange(startTime, duration)}
        />
        <Slider
          max={1000}
          className="mark mark-end"
          value={convertToTimeRange(endTime, duration)}
        />
        <SliderWithTooltip
          className="mark-progress"
          max={1000}
          value={this.slideTime()}
          tipFormatter={formatTooltipRange(duration)}
          onChange={this.handleChange}
          onAfterChange={this.handleChangeComplete}
        />
      </ProgressControlStyled>
    );
  }
}
