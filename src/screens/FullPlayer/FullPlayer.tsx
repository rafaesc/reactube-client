import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  FullVideo,
  VideoPlayer,
  Playlist,
  VideoClipContainer,
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

  const handleUpdateSelected = (idSelected: string) => {
    props.history.push("/video/" + idSelected);
  };

  const handleEdit = (idSelected: string) => {
    props.history.push("/edit/" + idSelected);
  };

  return (
    <PageStyled>
      <ContentFullStyled>
        <VideoPlayer
          onRemoveVideoClip={props.removePlaylistItem}
          idSelected={routerParams.id}
          onChangeSelected={handleUpdateSelected}
          onChangeVideoClip={props.setVideoClip}
          playlist={props.playlist}
        >
          <FullVideo />
          <Playlist>
            <VideoClipContainer>
              {idVideoClip => (
                <React.Fragment>
                  {routerParams.id !== idVideoClip && (
                    <button
                      onClick={props.removePlaylistItem.bind(null, idVideoClip)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  )}
                  <button onClick={handleEdit.bind(null, idVideoClip)}>
                    <i className="fas fa-edit" />
                  </button>
                </React.Fragment>
              )}
            </VideoClipContainer>
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
