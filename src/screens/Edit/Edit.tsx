import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditForm from "./EditForm";
import {
  CardStyled,
  ContentStyled,
  PageStyled,
  TitlePageStyled,
  IVideoClip
} from "../../components";
import AppProvider, { IAppProvider } from "../../AppProvider";
import { findVideoClipIndexForId } from "../../utils";

interface IRouterProps {
  id?: string;
}

interface IProps
  extends IAppProvider,
    RouteComponentProps<IRouterProps> {}

class Edit extends React.Component<IProps> {
  public state = {};

  public handleSuccess = (playlist: IVideoClip) => {
    const { setVideoClip, addVideoClip } = this.props;
    const { id } = this.props.match.params;

    if (id) {
      setVideoClip(id, playlist);
    } else {
      addVideoClip(playlist);
    }
  };

  public render() {
    const { playlist, history } = this.props;
    const { id } = this.props.match.params;
    let index;
    if (id) {
      index = findVideoClipIndexForId(playlist, id);
    }
    const existsIndex = index !== undefined;

    return (
      <PageStyled>
        <ContentStyled>
          <CardStyled>
            <TitlePageStyled>
              {id ? "Edit video" : "Add to playlist"}
            </TitlePageStyled>
            <EditForm
              playlist={existsIndex ? playlist[index] : undefined}
              history={history}
              onSuccess={this.handleSuccess}
            />
          </CardStyled>
        </ContentStyled>
      </PageStyled>
    );
  }
}

export default (props: RouteComponentProps<IRouterProps>) => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <Edit {...props} {...value} />}
  </AppProvider.Consumer>
);
