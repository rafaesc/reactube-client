import * as React from "react";
import { IPlaylistItem } from "../types";
import Item from "./Item";
import PlaylistProvider, { IPlaylistProvider } from "./Provider";
import {
  PlaylistHeadStyled,
  PlaylistBodyStyled,
  PlaylistHeadItemStyled,
  PlaylistWrapper,
  PlaylistContainer
} from "./styles";
import { isTypeEqual } from "../../utils";

export interface IPropsExternal {
  onClick?: (id: string) => void;
  playlist?: IPlaylistItem[];
  videoSelected?: string;
  expand?: boolean;
  children?: any;
}

export interface IProps extends IPropsExternal, IPlaylistProvider {}

export const PlaylistItem = props => props.children(props.id);

export const PlaylistHeader: React.SFC<any> = props => (
  <PlaylistHeadItemStyled>{props.children}</PlaylistHeadItemStyled>
);

const Playlist: React.SFC<IProps> = props => {
  const renderHeader = (): JSX.Element | null => {
    const listPlaylistHeader = React.Children.toArray(props.children).filter(
      (child: any) => {
        return isTypeEqual(child, PlaylistHeader);
      }
    );
    if (listPlaylistHeader.length) {
      return <PlaylistHeadStyled>{listPlaylistHeader}</PlaylistHeadStyled>;
    }
    return null;
  };

  const renderItemChildren = (id: string) => {
    return React.Children.toArray(props.children)
      .filter((child: any) => {
        return isTypeEqual(child, PlaylistItem);
      })
      .map((child: any) => React.cloneElement(child, { id }));
  };

  const { playlist = [], onClick, videoSelected, expand } = props;
  return (
    <PlaylistWrapper expand={expand}>
      <PlaylistContainer>
        {renderHeader()}
        <PlaylistBodyStyled expand={expand}>
          {playlist.map((item, index) => (
            <Item
              selected={videoSelected}
              index={index}
              key={index}
              expand={expand}
              {...item}
              onClick={onClick}
            >
              {renderItemChildren(item.id)}
            </Item>
          ))}
        </PlaylistBodyStyled>
      </PlaylistContainer>
    </PlaylistWrapper>
  );
};

export default (props: IPropsExternal) => (
  <PlaylistProvider>
    <PlaylistProvider.Consumer>
      {(value: IPlaylistProvider) => <Playlist {...props} {...value} />}
    </PlaylistProvider.Consumer>
  </PlaylistProvider>
);
