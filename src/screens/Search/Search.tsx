import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  SidebarStyled,
  ContentDinamicStyled,
  PageWithSidebarStyled,
  Playlist
} from "../../components";

import AppProvider, { IAppProvider } from "../../AppProvider";

interface IRouterProps {
  value: string;
}

interface IProps
  extends IAppProvider,
    RouteComponentProps<IRouterProps> {}

const Search: React.SFC<IProps> = props => {
  const value = props.match.params.value;

  const filteredPlaylist = props.playlist.filter(videoClip => {
    return videoClip.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });

  const handleClickVideo = (id: string) => {
    props.history.push("/video/" + id);
  };

  return (
    <React.Fragment>
      <SidebarStyled />
      <PageWithSidebarStyled>
        <ContentDinamicStyled>
          <Playlist
            expand={true}
            playlist={filteredPlaylist}
            onClick={handleClickVideo}
          />
        </ContentDinamicStyled>
      </PageWithSidebarStyled>
    </React.Fragment>
  );
};

export default (props: RouteComponentProps<IRouterProps>) => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <Search {...props} {...value} />}
  </AppProvider.Consumer>
);
