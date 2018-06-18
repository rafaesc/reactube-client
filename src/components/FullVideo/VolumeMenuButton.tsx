import * as React from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import Video from "./Video";

import { IPropsChildrens as IPropsFromPlayer } from "./FullVideo";

const SliderWithTooltip = createSliderWithTooltip(Slider);
import {
  VolumeIcon,
  VolumenMenuButtonStyled,
  VolumenMenuWrapperStyled
} from "./styles";

interface IState {
  value: number;
}

interface IProps extends IPropsFromPlayer {
  video: Video;
}

function tipFormatter(value) {
  return value + "%";
}

export default class VolumenMenuButton extends React.Component<IProps, IState> {
  public state = {
    value: 100
  };

  get value() {
    const { value } = this.state;
    if (!this.props.video) {
      return value;
    }
    return this.props.video.volume * 100;
  }

  public handleChange = (value: any) => {
    this.setState({ value });
    this.props.video.volume = value ? value / 100 : value;
    this.checkMuted();
  };

  public checkMuted() {
    const { video } = this.props;
    if (video.volume === 0) {
      video.muted = true;
    } else {
      video.muted = false;
    }
  }

  public classVolumeIcon() {
    const volume = this.value;
    let variant;
    if (volume > 70) {
      variant = "volume-up";
    } else if (volume > 20) {
      variant = "volume-down";
    } else {
      variant = "volume-off";
    }
    return "fas fa-" + variant;
  }

  public handleClickVolume = () => {
    if (this.state.value > 1) {
      this.handleChange(0);
    } else {
      this.handleChange(100);
    }
  };

  public render() {
    return (
      <VolumenMenuWrapperStyled>
        <div onClick={this.handleClickVolume}>
          <VolumeIcon>
            <i className={this.classVolumeIcon()} />
          </VolumeIcon>
        </div>
        <VolumenMenuButtonStyled tabIndex={0}>
          <SliderWithTooltip
            max={100}
            className="mark-volume"
            tipFormatter={tipFormatter}
            value={this.value}
            onChange={this.handleChange}
          />
        </VolumenMenuButtonStyled>
      </VolumenMenuWrapperStyled>
    );
  }
}
