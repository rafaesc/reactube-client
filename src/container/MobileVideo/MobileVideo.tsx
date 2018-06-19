import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";
import { FullVideo, IFullVideoProps } from "../../components";
import AppProvider, { IAppProvider } from "../../AppProvider";

import { findVideoClipForId } from "../../utils";
import { MobileVideoStyled } from "./styles";

interface IProps extends IAppProvider {}

const MobileVideo: React.SFC<IProps> = props => {
  const { playlist, idVideo } = props;
  const propsFullVideo: IFullVideoProps = {
    autoPlay: true,
    onChangeTimeFragment: () => {
      //
    }
  };
  if (idVideo !== "") {
    propsFullVideo.currentVideoClip = findVideoClipForId(playlist, idVideo);
  }

  return (
    <MobileVideoStyled>
      <FullVideo {...propsFullVideo} />
    </MobileVideoStyled>
  );
};

export default () => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <MobileVideo {...value} />}
  </AppProvider.Consumer>
);
