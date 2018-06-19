import * as React from "react";
import {
  VideoItem,
  SidebarStyled,
  ContentDinamicStyled,
  VideoItemListStyled,
  PageWithSidebarStyled
} from "../../components";

import AppProvider, { IAppProvider } from "../../AppProvider";

interface IProps extends IAppProvider {}

const Home: React.SFC<IProps> = props => {
  return (
    <div>
      <SidebarStyled />
      <PageWithSidebarStyled>
        <ContentDinamicStyled>
          <VideoItemListStyled>
            {props.playlist.map((videoClip, index) => (
              <VideoItem key={index} {...videoClip} />
            ))}
          </VideoItemListStyled>
        </ContentDinamicStyled>
      </PageWithSidebarStyled>
    </div>
  );
};

export default () => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <Home {...value} />}
  </AppProvider.Consumer>
);
