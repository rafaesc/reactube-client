import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditForm from "./EditForm";
import {
  CardStyled,
  ContentStyled,
  PageStyled,
  TitlePageStyled,
  IPlaylistItem
} from "../../components";
import LocalStorageProvider, {
  ILocalStorageProvider
} from "../../LocalStorageProvider";
import { findIndexPlaylistForId } from "../../utils";

interface IRouterProps {
  id?: string;
}

interface IProps
  extends ILocalStorageProvider,
    RouteComponentProps<IRouterProps> {}

class Edit extends React.Component<IProps> {
  public state = {};

  public handleSuccess = (playlist: IPlaylistItem) => {
    const {
      match: {
        params: { id }
      },
      updatePlaylistItem,
      addPlaylistItem
    } = this.props;

    if (id) {
      updatePlaylistItem(id, playlist);
    } else {
      addPlaylistItem(playlist);
    }
  };

  public render() {
    const {
      playlist,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    let index;
    if (id) {
      index = findIndexPlaylistForId(playlist, id);
    }

    return (
      <PageStyled>
        <ContentStyled>
          <CardStyled>
            <TitlePageStyled>
              {id ? "Edit video" : "Add to playlist"}
            </TitlePageStyled>
            <EditForm
              playlist={index ? playlist[index] : undefined}
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
  <LocalStorageProvider.Consumer>
    {(value: ILocalStorageProvider) => <Edit {...props} {...value} />}
  </LocalStorageProvider.Consumer>
);
