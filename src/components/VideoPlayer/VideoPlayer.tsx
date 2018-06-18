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

class VideoPlayer extends React.Component<IProps> {
  public handleChangeTimeFragment = (startTime, endTime) => {
    const { updatePlaylistItem, videoSelected } = this.props;
    updatePlaylistItem(videoSelected, { startTime, endTime });
  };

  public handlePlaylistAction = (value: "next" | "back") => {
    const { playlist, videoSelected, updateSelected, repeat } = this.props;
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

  public getPlaylistChildren = child => {
    const { setAutoPlay, repeat, setRepeat, autoPlaylist } = this.props;
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

  public renderChildren = () => {
    const {
      playlist,
      videoSelected,
      updateSelected,
      autoPlaylist,
      repeat,
      setAutoPlay
    } = this.props;

    return React.Children.toArray(this.props.children).map((child: any) => {
      if (isTypeEqual(child, Playlist)) {
        const props: IPlaylistProps = {
          children: this.getPlaylistChildren(child),
          onClick: updateSelected,
          playlist,
          videoSelected
        };
        return React.cloneElement(child, props);
      }

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

        const props: IFullVideoProps = {
          autoPlay: true,
          autoPlaylist: nextVideo ? autoPlaylist : false,
          currentVideo: itemSelected,
          nextVideo,
          onPlaylistAction: this.handlePlaylistAction,
          setAutoPlay,
          updatedTimeFragment: this.handleChangeTimeFragment
        };

        return React.cloneElement(child, props);
      }
      return null;
    });
  };

  public render() {
    return <VideoPlayStyled>{this.renderChildren()}</VideoPlayStyled>;
  }
}

export default (props: IPropsExternal) => (
  <VideoPlayerProvider>
    <VideoPlayerProvider.Consumer>
      {(value: IVideoPlayerProvider) => <VideoPlayer {...props} {...value} />}
    </VideoPlayerProvider.Consumer>
  </VideoPlayerProvider>
);
