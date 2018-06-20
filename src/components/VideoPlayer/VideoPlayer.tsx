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
import {
  isTypeEqual,
  findVideoClipIndexForId,
  getPlaylistActions
} from "../../utils";
import { IVideoClip, IVideoClipOptional } from "../types";
import { LayoutFullVideo } from "../styles";

export interface IPropsExternal {
  idSelected: string;
  playlist: IVideoClip[];
  repeat: boolean;
  random: boolean;
  autoPlaylist: boolean;
  onChangeRandom: (random: boolean) => void;
  onRemoveVideoClip: (id: string) => void;
  onChangeRepeat: (repeat: boolean) => void;
  onChangeAutoPlaylist: (autoPlay: boolean) => void;
  onChangeSelected: (id: string) => void;
  onChangeVideoClip: (id: string, playlist: IVideoClipOptional) => void;
  children?: any;
}

interface IProps extends IPropsExternal {
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

  const handlePlaylistAction = (videoClip: IVideoClip) => {
    const { onChangeSelected } = props;
    onChangeSelected(videoClip.id);
  };

  const getPlaylistChildren = child => {
    const {
      onChangeAutoPlaylist,
      repeat,
      onChangeRepeat,
      autoPlaylist,
      random,
      onChangeRandom
    } = props;
    const children = React.Children.toArray(child.props.children);

    children.unshift(
      <PlaylistHeader>
        <PlaylistSwitchStyled>
          <Switch checked={autoPlaylist} onChange={onChangeAutoPlaylist} />
          <span> Autoplay</span>
        </PlaylistSwitchStyled>
        <PlaylistHeadButtonStyled
          active={repeat}
          onClick={onChangeRepeat.bind(null, !repeat)}
        >
          <i className="fas fa-redo-alt" />
          <span> Loop</span>
        </PlaylistHeadButtonStyled>
        <PlaylistHeadButtonStyled
          active={random}
          onClick={onChangeRandom.bind(null, !random)}
        >
          <i className="fas fa-random" />
          <span> Random</span>
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
      random,
      onChangeAutoPlaylist
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
      if (
        isTypeEqual(child, FullVideo) ||
        isTypeEqual(child, LayoutFullVideo)
      ) {
        const index = findVideoClipIndexForId(playlist, idSelected);

        const {
          nextVideoClip,
          backVideoClip,
          currentVideoClip
        } = getPlaylistActions(index, playlist, repeat, random);

        const newProps: IFullVideoProps = {
          autoPlay: true,
          autoPlaylist: nextVideoClip ? autoPlaylist : false,
          backVideoClip,
          currentVideoClip,
          nextVideoClip,
          onChangeAutoPlaylist,
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

export default VideoPlayer;
