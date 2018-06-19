import * as React from "react";
import { Link } from "react-router-dom";
import { IVideoClip } from "../types";
import {
  VideoItemStyled,
  VideoItemImage,
  VideoItemBottom,
  VideoItemTitle,
  VideoItemSubTitle
} from "./styles";

interface IProps extends IVideoClip { }

const VideoItem: React.SFC<IProps> = props => {
  return (
    <VideoItemStyled>
      <Link to={"/video/" + props.id}>
        <VideoItemImage image={props.image} />
        <VideoItemBottom>
          <VideoItemTitle>{props.title}</VideoItemTitle>
          <VideoItemSubTitle>2 weeks ago</VideoItemSubTitle>
        </VideoItemBottom>
      </Link>
    </VideoItemStyled>
  );
};

export default VideoItem;
