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
import { isTypeEqual, findIndexPlaylistForId } from "../../utils";
import { IPlaylistItem, IPlaylistItemOptional } from "../types";

export interface IPropsExternal {
  videoSelected: string;
  playlist: IPlaylistItem[];
  removePlaylistItem: (id: string) => void;
  updateSelected: (id: string) => void;
  updatePlaylistItem: (id: string, playlist: IPlaylistItemOptional) => void;
  children?: any;
}

interface IProps extends IPropsExternal, IVideoPlayerProvider {
  children?: React.ReactNode;
}

const VideoPlayer: React.SFC<IProps> = props => {
  const handleChangeTimeFragment = (startTime, endTime) => {
    const { updatePlaylistItem, videoSelected } = props;
    updatePlaylistItem(videoSelected, { startTime, endTime });
  };

  const handleClickPlaylistItem = (id: string) => {
    const { updateSelected } = props;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    updateSelected(id);
  };

  const handlePlaylistAction = (value: "next" | "back") => {
    const { playlist, videoSelected, updateSelected, repeat } = props;
    let newVideoSelected;
    const index = findIndexPlaylistForId(playlist, videoSelected);

    if (index !== null) {
      if (value === "next") {
        newVideoSelected = index + 1;
      } else {
        newVideoSelected = index - 1;
      }
      const loadVideo = playlist[newVideoSelected];

      if (loadVideo) {
        updateSelected(loadVideo.id);
      } else if (repeat) {
        updateSelected(playlist[0].id);
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
      videoSelected,
      autoPlaylist,
      repeat,
      setAutoPlay
    } = props;

    return React.Children.toArray(props.children).map((child: any) => {
      // Take all Playlist components
      if (isTypeEqual(child, Playlist)) {
        const newProps: IPlaylistProps = {
          children: getPlaylistChildren(child),
          onClick: handleClickPlaylistItem,
          playlist,
          videoSelected
        };
        return React.cloneElement(child, newProps);
      }

      // Take all FullVideo components
      if (isTypeEqual(child, FullVideo)) {
        const index = findIndexPlaylistForId(playlist, videoSelected);
        let nextVideo;
        let itemSelected;
        if (index === null) {
          itemSelected = {
            id: ""
          };
        } else {
          nextVideo = playlist[index + 1];

          if (repeat && !nextVideo) {
            nextVideo = playlist[0];
          }

          itemSelected = playlist[index];
        }

        const newProps: IFullVideoProps = {
          autoPlay: true,
          autoPlaylist: nextVideo ? autoPlaylist : false,
          currentVideo: itemSelected,
          nextVideo,
          onPlaylistAction: handlePlaylistAction,
          setAutoPlay,
          updatedTimeFragment: handleChangeTimeFragment
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
