import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import {
  ComingNextStyled,
  ComingNextImageStyled,
  ComingNextTopStyled,
  ComingNextHeaderStyled,
  ComingNextAutoplayStyled,
  ComingNextTitleStyled,
  ComingNextIconStyled,
  ComingNextBottomStyled,
  ComingNextButtonStyled
} from "./styles";
import { IVideoClip } from "../types";
import { showSpinnerNextVideo } from "../../utils";

const NEXT_DURATION = 3;

class CommingNext extends React.Component<
  {
    nextVideoClip: IVideoClip;
    onChangeAutoPlay?: (autoPlay: boolean) => void;
    onClickPlaylistAction: (videoClip: IVideoClip) => void;
  },
  { count: number }
> {
  public time;
  public state = {
    count: NEXT_DURATION
  };

  public componentDidMount() {
    this.time = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({ count: newCount });
      if (newCount === 0) {
        this.launchNextVideoClip();
      }
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.time);
    this.setState({ count: NEXT_DURATION });
  }

  public launchNextVideoClip = () => {
    if (this.props.onClickPlaylistAction) {
      this.props.onClickPlaylistAction(this.props.nextVideoClip);
    }
    clearInterval(this.time);
  };

  public handleStopTime = () => {
    const { onChangeAutoPlay } = this.props;
    if (onChangeAutoPlay) {
      onChangeAutoPlay(false);
    }
  };

  public render() {
    const { nextVideoClip } = this.props;

    return (
      <ComingNextStyled>
        <ComingNextImageStyled image={nextVideoClip.image} />
        <ComingNextTopStyled>
          <ComingNextHeaderStyled>Up Next</ComingNextHeaderStyled>
          <ComingNextTitleStyled>{nextVideoClip.title}</ComingNextTitleStyled>
        </ComingNextTopStyled>
        <ComingNextAutoplayStyled onClick={this.launchNextVideoClip}>
          <ComingNextIconStyled>
            <i className="fas fa-step-forward" />
          </ComingNextIconStyled>
          <svg height="100%" version="1.1" viewBox="0 0 72 72" width="100%">
            <circle cx="36" cy="36" fill="#fff" fillOpacity="0.3" r="31.5" />
            <circle
              className="fill-up"
              cx="-36"
              cy="36"
              fillOpacity="0"
              r="33.5"
              stroke="#FFFFFF"
              strokeDasharray="211"
              strokeDashoffset="-211"
              strokeWidth="4"
              transform="rotate(-90)"
            />
          </svg>
        </ComingNextAutoplayStyled>
        <ComingNextBottomStyled>
          <ComingNextButtonStyled onClick={this.handleStopTime}>
            CANCEL
          </ComingNextButtonStyled>
        </ComingNextBottomStyled>
      </ComingNextStyled>
    );
  }
}

interface IProps extends IPropsFromFullVideo {
  video: Video;
}
const WrapperComingNext: React.SFC<IProps> = props => {
  const {
    autoPlaylist,
    currentVideoClip: { endTime },
    nextVideoClip,

    onChangeAutoPlaylist,
    onClickPlaylistAction,
    provider: { currentTime, duration }
  } = props;

  if (
    showSpinnerNextVideo(currentTime, endTime, duration, autoPlaylist) &&
    onClickPlaylistAction &&
    nextVideoClip
  ) {
    return (
      <CommingNext
        onChangeAutoPlay={onChangeAutoPlaylist}
        nextVideoClip={nextVideoClip}
        onClickPlaylistAction={onClickPlaylistAction}
      />
    );
  }
  return null;
};

export default WrapperComingNext;
