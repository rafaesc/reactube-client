import * as React from "react";
import Switch from "rc-switch";
import FullVideo, {
  IExternalProps as IFullVideoProps
} from "../FullVideo/FullVideo";
import Playlist, {
  IPropsExternal as IPlaylistProps,
  PlaylistHeader
} from "../Playlist/Playlist";
import {
  PlaylistHeadButtonStyled,
  PlaylistSwitchStyled
} from "../Playlist/styles";
import { VideoPlayStyled } from "./styles";
import VideoPlayerProvider, { IVideoPlayerProvider } from "./Provider";
import { isTypeEqual, findVideoClipIndexForId } from "../../utils";
import { IVideoClip, IVideoClipOptional } from "../types";

export interface IPropsExternal {
  idSelected: string;
  playlist: IVideoClip[];
  onRemoveVideoClip: (id: string) => void;
  onChangeSelected: (id: string) => void;
  onChangeVideoClip: (id: string, playlist: IVideoClipOptional) => void;
  children?: any;
}

interface IProps extends IPropsExternal, IVideoPlayerProvider {
  children?: React.ReactNode;
}

const VideoPlayer: React.SFC<IProps> = props => {
  const handleChangeTimeFragment = (startTime, endTime) => {
    const { onChangeVideoClip, idSelected } = props;
    onChangeVideoClip(idSelected, { startTime, endTime });
  };

  const handleClickPlaylistItem = (id: string) => {
    const { onChangeSelected } = props;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    onChangeSelected(id);
  };

  const handlePlaylistAction = (value: "next" | "back") => {
    const { playlist, idSelected, onChangeSelected, repeat } = props;
    let indexSelected;
    const index = findVideoClipIndexForId(playlist, idSelected);

    if (index !== null) {
      if (value === "next") {
        indexSelected = index + 1;
      } else {
        indexSelected = index - 1;
      }
      const loadVideo = playlist[indexSelected];

      if (loadVideo) {
        onChangeSelected(loadVideo.id);
      } else if (repeat) {
        onChangeSelected(playlist[0].id);
      }
    }
  };

  const getPlaylistChildren = child => {
    const { setAutoPlay, repeat, setRepeat, autoPlaylist } = props;
    const children = React.Children.toArray(child.props.children);

    children.unshift(
      <PlaylistHeader>
        <PlaylistSwitchStyled>
          <Switch checked={autoPlaylist} onChange={setAutoPlay} />
          <span> Autoplay</span>
        </PlaylistSwitchStyled>
        <PlaylistHeadButtonStyled
          active={repeat}
          onClick={setRepeat.bind(null, !repeat)}
        >
          <i className="fas fa-redo-alt" />
          <span> Loop</span>
        </PlaylistHeadButtonStyled>
      </PlaylistHeader>
    );

    return children;
  };

  const renderChildren = () => {
    const {
      playlist,
      idSelected,
      autoPlaylist,
      repeat,
      setAutoPlay
    } = props;

    return React.Children.toArray(props.children).map((child: any) => {
      // Take all Playlist components
      if (isTypeEqual(child, Playlist)) {
        const newProps: IPlaylistProps = {
          children: getPlaylistChildren(child),
          idSelected,
          onClick: handleClickPlaylistItem,
          playlist
        };
        return React.cloneElement(child, newProps);
      }

      // Take all FullVideo components
      if (isTypeEqual(child, FullVideo)) {
        const index = findVideoClipIndexForId(playlist, idSelected);
        let nextVideoClip;
        let videoClipSelected;
        if (index === null) {
          videoClipSelected = {
            id: ""
          };
        } else {
          nextVideoClip = playlist[index + 1];

          if (repeat && !nextVideoClip) {
            nextVideoClip = playlist[0];
          }

          videoClipSelected = playlist[index];
        }

        const newProps: IFullVideoProps = {
          autoPlay: true,
          autoPlaylist: nextVideoClip ? autoPlaylist : false,
          currentVideoClip: videoClipSelected,
          nextVideoClip,
          onChangeAutoPlay: setAutoPlay,
          onChangeTimeFragment: handleChangeTimeFragment,
          onClickPlaylistAction: handlePlaylistAction
        };

        return React.cloneElement(child, newProps);
      }
      return null;
    });
  };

  return <VideoPlayStyled>{renderChildren()}</VideoPlayStyled>;
};

export default (props: IPropsExternal) => (
  <VideoPlayerProvider>
    <VideoPlayerProvider.Consumer>
      {(value: IVideoPlayerProvider) => <VideoPlayer {...props} {...value} />}
    </VideoPlayerProvider.Consumer>
  </VideoPlayerProvider>
);
