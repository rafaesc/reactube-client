import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  FullVideo,
  VideoPlayer,
  Playlist,
  PlaylistItem,
  ContentFullStyled,
  PageStyled
} from "../../components";

import LocalStorageProvider, {
  ILocalStorageProvider
} from "../../LocalStorageProvider";

interface IRouterProps {
  id: string;
}

interface IProps
  extends ILocalStorageProvider,
    RouteComponentProps<IRouterProps> {}

const FullPlayer: React.SFC<IProps> = props => {
  const routerParams = props.match.params;

  const handleUpdateSelected = (videoSelected: string) => {
    props.history.push("/video/" + videoSelected);
  };

  const handleEdit = (videoSelected: string) => {
    props.history.push("/edit/" + videoSelected);
  };

  return (
    <PageStyled>
      <ContentFullStyled>
        <VideoPlayer
          removePlaylistItem={props.removePlaylistItem}
          videoSelected={routerParams.id}
          updateSelected={handleUpdateSelected}
          updatePlaylistItem={props.updatePlaylistItem}
          playlist={props.playlist}
        >
          <FullVideo />
          <Playlist>
            <PlaylistItem>
              {idItem => (
                <React.Fragment>
                  {routerParams.id !== idItem && (
                    <button
                      onClick={props.removePlaylistItem.bind(null, idItem)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  )}
                  <button onClick={handleEdit.bind(null, idItem)}>
                    <i className="fas fa-edit" />
                  </button>
                </React.Fragment>
              )}
            </PlaylistItem>
          </Playlist>
        </VideoPlayer>
      </ContentFullStyled>
    </PageStyled>
  );
};

export default (props: RouteComponentProps<IRouterProps>) => (
  <LocalStorageProvider.Consumer>
    {(value: ILocalStorageProvider) => <FullPlayer {...props} {...value} />}
  </LocalStorageProvider.Consumer>
);
