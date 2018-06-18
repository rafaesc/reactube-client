import * as React from "react";
import Video from "./Video";
import {
  LoadingSpinnerStyled,
  LoadingSpinnerContainer,
  LoadingSpinnerRotator,
  LoadingSpinnerLeft,
  LoadingSpinnerCircle,
  LoadingSpinnerRight
} from "./styles";
import { IPropsChildrens as IPropsFromFullVideo } from "./FullVideo";

interface IProps extends IPropsFromFullVideo {
  video: Video;
}

const LoadingSpinner: React.SFC<IProps> = ({ provider: { waiting } }) => (
  <LoadingSpinnerStyled waiting={waiting}>
    <LoadingSpinnerContainer>
      <LoadingSpinnerRotator>
        <LoadingSpinnerLeft>
          <LoadingSpinnerCircle />
        </LoadingSpinnerLeft>
        <LoadingSpinnerRight>
          <LoadingSpinnerCircle />
        </LoadingSpinnerRight>
      </LoadingSpinnerRotator>
    </LoadingSpinnerContainer>
  </LoadingSpinnerStyled>
);

export default LoadingSpinner;
