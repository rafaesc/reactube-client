import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import Slider, { createSliderWithTooltip } from "rc-slider";
import { FragmentControlStyled } from "./styles";
import {
  convertToTimeRange,
  convertToTime,
  formatTooltipRange
} from "../../utils";

interface IState {
  changed: boolean;
  value: { min: number; max: number };
}

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const SliderWithTooltip = createSliderWithTooltip(Slider.Range);

export default class FragmentControl extends React.Component<IProps, IState> {
  public state = {
    changed: false,
    value: {
      max: 1,
      min: 0
    }
  };

  public componentWillMount() {
    const {
      provider: { duration },
      currentVideoClip: { startTime, endTime }
    } = this.props;

    this.updateValue(startTime, endTime, duration);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const {
      provider: { duration },
      currentVideoClip: { startTime, endTime }
    } = this.props;

    // Changed video
    if (
      nextProps.provider.duration &&
      (nextProps.currentVideoClip.startTime !== startTime ||
        nextProps.currentVideoClip.endTime !== endTime ||
        nextProps.provider.duration !== duration)
    ) {
      const provider = nextProps.provider;
      this.updateValue(
        nextProps.currentVideoClip.startTime,
        nextProps.currentVideoClip.endTime,
        provider.duration
      );
    }
  }

  public updateValue(startTime, endTime, duration) {
    const { editingValues } = this.props;
    const max = convertToTimeRange(endTime, duration);
    const min = convertToTimeRange(startTime, duration);

    this.setState({
      value: {
        max,
        min
      }
    });

    editingValues({
      editMax: endTime,
      editMin: startTime
    });
  }

  get range() {
    const {
      provider: { duration, editActive },
      currentVideoClip: { startTime, endTime }
    } = this.props;

    const { changed, value } = this.state;

    if (changed || editActive) {
      return value;
    }

    return {
      max: convertToTimeRange(endTime, duration),
      min: convertToTimeRange(startTime, duration)
    };
  }

  get value() {
    const { min, max } = this.range;
    return [min, max];
  }

  public handleChange = ([min, max]: [number, number]) => {
    this.setState({ changed: true, value: { min, max } });
  };

  public handleChangeComplete = ([min, max]: [number, number]) => {
    const {
      provider: { duration, editActive },
      currentVideoClip: { startTime, endTime },
      editingValues
    } = this.props;

    if (editActive) {
      editingValues({
        editMax: convertToTime(max, duration),
        editMin: convertToTime(min, duration)
      });
    } else {
      min = convertToTimeRange(startTime, duration);
      max = convertToTimeRange(endTime, duration);
    }
    this.setState({ changed: false, value: { min, max } });
  };

  public render() {
    const {
      provider: { duration, editActive }
    } = this.props;
    return (
      <FragmentControlStyled editActive={editActive}>
        <SliderWithTooltip
          className="mark-fragment"
          max={1000}
          value={this.value}
          onChange={this.handleChange}
          onAfterChange={this.handleChangeComplete}
          tipFormatter={formatTooltipRange(duration)}
        />
      </FragmentControlStyled>
    );
  }
}
