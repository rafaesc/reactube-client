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
import { IPlaylistItem } from "../types";
import { showSpinnerNextVideo } from "../../utils";

class CommingNext extends React.Component<
  {
    nextVideo: IPlaylistItem;
    setAutoPlay?: (autoPlay: boolean) => void;
    onPlaylistAction: (value: string) => void;
  },
  { count: number }
> {
  public time;
  public state = {
    count: 3
  };

  public componentDidMount() {
    this.time = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({ count: newCount });
      if (newCount === 0) {
        this.launchNextVideo();
      }
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.time);
    this.setState({ count: 5 });
  }

  public launchNextVideo = () => {
    if (this.props.onPlaylistAction) {
      this.props.onPlaylistAction("next");
    }
    clearInterval(this.time);
  };

  public handleStopTime = () => {
    const { setAutoPlay } = this.props;
    if (setAutoPlay) {
      setAutoPlay(false);
    }
  };

  public render() {
    const { nextVideo } = this.props;

    return (
      <ComingNextStyled>
        <ComingNextImageStyled image={nextVideo.image} />
        <ComingNextTopStyled>
          <ComingNextHeaderStyled>Up Next</ComingNextHeaderStyled>
          <ComingNextTitleStyled>{nextVideo.title}</ComingNextTitleStyled>
        </ComingNextTopStyled>
        <ComingNextAutoplayStyled onClick={this.launchNextVideo}>
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
    currentVideo: { endTime },
    nextVideo,
    setAutoPlay,
    onPlaylistAction,
    provider: { currentTime, duration }
  } = props;

  if (
    showSpinnerNextVideo(currentTime, endTime, duration, autoPlaylist) &&
    onPlaylistAction &&
    nextVideo
  ) {
    return (
      <CommingNext
        setAutoPlay={setAutoPlay}
        nextVideo={nextVideo}
        onPlaylistAction={onPlaylistAction}
      />
    );
  }
  return null;
};

export default WrapperComingNext;
