import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";
import { FullVideo, IFullVideoProps, IVideoClip } from "../../components";
import AppProvider, { IAppProvider } from "../../AppProvider";

import {
  findVideoClipForId,
  findVideoClipIndexForId,
  getPlaylistActions
} from "../../utils";
import { MobileVideoStyled, MobileVideoCloseStyled } from "./styles";
import { VideoPlayStyled } from "../../components/VideoPlayer/styles";

interface IProps extends RouteComponentProps<any>, IAppProvider {}

const MobileVideo = withRouter((props: IProps) => {
  const {
    playlist,
    idVideo,
    inFullPlayer,
    autoPlaylist,
    setAutoPlaylist,
    repeat,
    random
  } = props;
  const showControls = inFullPlayer;

  const changeVideo = (id: string) => {
    props.history.push("/video/" + id);
  };

  const handlePlaylistAction = (videoClip: IVideoClip) => {
    changeVideo(videoClip.id);
  };

  const handleClick = () => {
    if (!showControls) {
      changeVideo(props.idVideo);
    }
  };

  const handleClose = () => {
    props.setIdVideo("");
  };

  const propsFullVideo: IFullVideoProps = {
    autoPlay: true,
    onChangeAutoPlaylist: setAutoPlaylist,
    onClickPlaylistAction: handlePlaylistAction,
    showControls
  };

  if (idVideo !== "") {
    const index = findVideoClipIndexForId(playlist, idVideo);
    const {
      nextVideoClip,
      backVideoClip,
      currentVideoClip
    } = getPlaylistActions(index, playlist, repeat, random);

    propsFullVideo.autoPlaylist = nextVideoClip ? autoPlaylist : false;
    propsFullVideo.currentVideoClip = currentVideoClip;
    propsFullVideo.backVideoClip = backVideoClip;
    propsFullVideo.nextVideoClip = nextVideoClip;
  }

  return (
    <MobileVideoStyled top={inFullPlayer} hidden={idVideo === ""}>
      <MobileVideoCloseStyled onClick={handleClose}>
        <i className="fas fa-times" />
      </MobileVideoCloseStyled>
      <VideoPlayStyled onClick={handleClick}>
        <FullVideo {...propsFullVideo} />
      </VideoPlayStyled>
    </MobileVideoStyled>
  );
});

export default () => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <MobileVideo {...value} />}
  </AppProvider.Consumer>
);
