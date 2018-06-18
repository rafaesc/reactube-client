import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { EditButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

export default class EditButton extends React.Component<IProps> {
  public handleClick = () => {
    this.props.editing(true);
  };
  public handleCancel = () => {
    this.props.editing(false);
  };

  public handleSave = () => {
    const {
      editing,
      updatedTimeFragment,
      provider: { editMin, editMax }
    } = this.props;

    updatedTimeFragment(editMin, editMax);
    editing(false);
  };

  public render() {
    const { editActive } = this.props.provider;
    return editActive ? (
      <React.Fragment>
        <EditButtonStyled
          onClick={this.handleCancel}
          editActive={editActive}
          tabIndex={0}
        >
          Cancel
        </EditButtonStyled>
        <EditButtonStyled
          onClick={this.handleSave}
          editActive={editActive}
          tabIndex={0}
        >
          Save
        </EditButtonStyled>
      </React.Fragment>
    ) : (
      <EditButtonStyled
        onClick={this.handleClick}
        editActive={editActive}
        tabIndex={0}
      >
        <i className="fas fa-crop" />
      </EditButtonStyled>
    );
  }
}
