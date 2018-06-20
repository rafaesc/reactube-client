import * as React from "react";
import Video from "./Video";

import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";
import { EditButtonStyled } from "./styles";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const EditButton: React.SFC<IProps> = props => {
  const handleClick = () => {
    props.editing(true);
  };
  const handleCancel = () => {
    props.editing(false);
  };

  const handleSave = () => {
    const {
      editing,
      onChangeTimeFragment,
      provider: { editMin, editMax }
    } = props;

    if (onChangeTimeFragment) {
      onChangeTimeFragment(editMin, editMax);
    }
    editing(false);
  };

  const { editActive } = props.provider;
  return editActive ? (
    <React.Fragment>
      <EditButtonStyled
        onClick={handleCancel}
        editActive={editActive}
        tabIndex={0}
      >
        Cancel
      </EditButtonStyled>
      <EditButtonStyled
        onClick={handleSave}
        editActive={editActive}
        tabIndex={0}
      >
        Save
      </EditButtonStyled>
    </React.Fragment>
  ) : (
    <EditButtonStyled
      onClick={handleClick}
      editActive={editActive}
      tabIndex={0}
    >
      <i className="fas fa-crop" />
    </EditButtonStyled>
  );
};

export default EditButton;
