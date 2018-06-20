import * as React from "react";
import { mediaProperties } from "./consts";
import { IProps as IPropsFromPlayer } from "./FullVideo";
import { showSpinnerNextVideo } from "../../utils";
import { VideoStyled, VideoWrapperStyled } from "./styles";

export interface IProps extends IPropsFromPlayer {
  children?: any;
}

export default class Video extends React.Component<IProps> {
  public video: HTMLVideoElement;

  public componentWillReceiveProps(nextProps: IProps) {
    // Bug when try to repeat the same video with different id
    const {
      currentVideoClip: { id, src }
    } = this.props;
    if (
      nextProps.currentVideoClip.id !== id &&
      nextProps.currentVideoClip.src === src
    ) {
      this.video.currentTime = nextProps.currentVideoClip.startTime;
      this.play();
    }
  }

  public componentDidMount() {
    this.volume = this.props.provider.volume;
  }

  public getVideo() {
    if (!this.video) {
      return null;
    }

    return mediaProperties.reduce((properties, key) => {
      properties[key] = this.video[key];
      return properties;
    }, {});
  }

  get muted() {
    return this.video.muted;
  }

  set muted(val) {
    this.video.muted = val;
  }

  get volume() {
    return this.video.volume;
  }

  set volume(val) {
    if (val > 1) {
      val = 1;
    }
    if (val < 0) {
      val = 0;
    }
    this.video.volume = val;
  }

  public play = () => {
    const {
      currentVideoClip: { endTime, startTime },
      provider: { duration }
    } = this.props;
    const fixEndTime = endTime > duration ? duration : endTime;
    if (
      this.video.currentTime >= fixEndTime ||
      this.video.currentTime <= startTime
    ) {
      this.video.currentTime = startTime;
    }
    this.video.play();
  };

  public pause = () => {
    this.video.pause();
  };

  public togglePlay = () => {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  };

  public seek = (time: number) => {
    try {
      this.video.currentTime = time;
    } catch (e) {
      //
    }
  };

  public forward = (seconds: number) => {
    const {
      currentVideoClip: { endTime, startTime }
    } = this.props;
    let finalCurrentTime = this.video.currentTime + seconds;
    if (finalCurrentTime >= endTime) {
      finalCurrentTime = startTime;
    } else if (finalCurrentTime <= startTime) {
      finalCurrentTime = endTime;
    }
    this.seek(finalCurrentTime);
  };

  public replay = (seconds: number) => {
    this.forward(-seconds);
  };

  public handleLoadStart = () => {
    const {
      onLoadStart,
      currentVideoClip: { startTime }
    } = this.props;
    onLoadStart(this.getVideo());

    this.video.currentTime = startTime || 0;
  };

  public handleCanPlay = () => {
    this.props.canPlay(this.getVideo());
  };

  public handlePlaying = () => {
    this.props.playing(this.getVideo());
  };

  public handlePlay = () => {
    this.props.play(this.getVideo());
  };

  public handlePause = () => {
    this.props.pause(this.getVideo());
  };

  public handleDurationChange = () => {
    this.props.reload(this.getVideo());
  };

  public handleProgress = () => {
    if (this.video) {
      this.props.reload(this.getVideo());
    }
  };

  public handleEnded = () => {
    const { end } = this.props;
    end(this.getVideo());
  };

  public handleWaiting = () => {
    this.props.waiting(this.getVideo());
  };

  public handleSeeking = () => {
    this.props.seeking(this.getVideo());
  };

  public handleSeeked = () => {
    this.props.seeked(this.getVideo());
  };

  public handleEmptied = () => {
    this.props.reload(this.getVideo());
  };

  public handleLoadedMetaData = () => {
    const {
      currentVideoClip: { startTime },
      reload
    } = this.props;
    if (startTime && startTime > 0) {
      this.video.currentTime = startTime;
    }
    reload(this.getVideo());
  };

  public handleLoadedData = () => {
    this.props.reload(this.getVideo());
  };

  public handleTimeUpdate = () => {
    const {
      reload,
      currentVideoClip: { endTime }
    } = this.props;
    if (this.video.currentTime >= endTime) {
      this.pause();
    }
    reload(this.getVideo());
  };

  public handleVolumeChange = () => {
    this.props.changeVolume(this.getVideo());
  };

  public render() {
    const {
      autoPlay = false,
      currentVideoClip: { src, endTime },
      autoPlaylist,
      provider: { currentTime, duration, fullscreen }
    } = this.props;

    return (
      <VideoWrapperStyled
        fullscreen={fullscreen}
        show={
          !showSpinnerNextVideo(currentTime, endTime, duration, autoPlaylist)
        }
      >
        <VideoStyled
          // tslint:disable-next-line:jsx-no-lambda
          innerRef={(c: any) => {
            this.video = c;
          }}
          autoPlay={autoPlay}
          src={src}
          playsinline={true}
          preload="auto"
          onLoadStart={this.handleLoadStart}
          onWaiting={this.handleWaiting}
          onCanPlay={this.handleCanPlay}
          onPlaying={this.handlePlaying}
          onEnded={this.handleEnded}
          onSeeking={this.handleSeeking}
          onSeeked={this.handleSeeked}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onProgress={this.handleProgress}
          onDurationChange={this.handleDurationChange}
          onEmptied={this.handleEmptied}
          onLoadedMetadata={this.handleLoadedMetaData}
          onLoadedData={this.handleLoadedData}
          onTimeUpdate={this.handleTimeUpdate}
          onVolumeChange={this.handleVolumeChange}
        >
          {this.props.children}
        </VideoStyled>
      </VideoWrapperStyled>
    );
  }
}
