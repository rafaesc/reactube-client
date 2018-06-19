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

import AppProvider, { IAppProvider } from "../../AppProvider";

interface IRouterProps {
  id: string;
}

interface IProps extends IAppProvider, RouteComponentProps<IRouterProps> {}

class FullPlayer extends React.Component<IProps> {
  public componentWillMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.props.setIdVideo(this.props.match.params.id);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const idVideo = this.props.match.params.id;
    const newIdVideo = nextProps.match.params.id;
    if (idVideo !== newIdVideo) {
      this.props.setIdVideo(this.props.match.params.id);
    }
  }

  public handleEdit = (idSelected: string) => {
    this.props.history.push("/edit/" + idSelected);
  };

  public handleUpdateSelected = (idSelected: string) => {
    this.props.history.push("/video/" + idSelected);
  };

  public render() {
    const routerParams = this.props.match.params;

    return (
      <PageStyled>
        <ContentFullStyled>
          <VideoPlayer
            onRemoveVideoClip={this.props.removePlaylistItem}
            idSelected={routerParams.id}
            onChangeSelected={this.handleUpdateSelected}
            onChangeVideoClip={this.props.setVideoClip}
            playlist={this.props.playlist}
          >
            <FullVideo />
            <Playlist>
              <VideoClipContainer>
                {idVideoClip => (
                  <React.Fragment>
                    {routerParams.id !== idVideoClip && (
                      <button
                        onClick={this.props.removePlaylistItem.bind(
                          null,
                          idVideoClip
                        )}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    )}
                    <button onClick={this.handleEdit.bind(null, idVideoClip)}>
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
  }
}

export default (props: RouteComponentProps<IRouterProps>) => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <FullPlayer {...props} {...value} />}
  </AppProvider.Consumer>
);
