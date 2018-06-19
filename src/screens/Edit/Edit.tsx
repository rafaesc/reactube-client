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
    const { updatePlaylistItem, addPlaylistItem } = this.props;
    const { id } = this.props.match.params;

    if (id) {
      updatePlaylistItem(id, playlist);
    } else {
      addPlaylistItem(playlist);
    }
  };

  public render() {
    const { playlist, history } = this.props;
    const { id } = this.props.match.params;
    let index;
    if (id) {
      index = findIndexPlaylistForId(playlist, id);
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
  <LocalStorageProvider.Consumer>
    {(value: ILocalStorageProvider) => <Edit {...props} {...value} />}
  </LocalStorageProvider.Consumer>
);
