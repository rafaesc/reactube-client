import * as React from "react";
import {
  VideoItem,
  SidebarStyled,
  ContentDinamicStyled,
  VideoItemListStyled,
  PageWithSidebarStyled
} from "../../components";

import LocalStorageProvider, {
  ILocalStorageProvider
} from "../../LocalStorageProvider";

interface IProps extends ILocalStorageProvider {}

const Home: React.SFC<IProps> = props => {
  return (
    <div>
      <SidebarStyled />
      <PageWithSidebarStyled>
        <ContentDinamicStyled>
          <VideoItemListStyled>
            {props.playlist.map((item, index) => (
              <VideoItem key={index} {...item} />
            ))}
          </VideoItemListStyled>
        </ContentDinamicStyled>
      </PageWithSidebarStyled>
    </div>
  );
};

export default () => (
  <LocalStorageProvider.Consumer>
    {(value: ILocalStorageProvider) => <Home {...value} />}
  </LocalStorageProvider.Consumer>
);
