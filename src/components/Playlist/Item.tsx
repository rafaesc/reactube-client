import * as React from "react";
import { IVideoClip } from "../types";
import {
  ItemStyled,
  ItemContainStyled,
  ItemButtonsContainStyled,
  ItemLeftIndexStyled,
  ItemTitleStyled,
  ItemTagsStyled,
  ItemImageStyled
} from "./styles";

interface IProps extends IVideoClip {
  index: number;
  selected?: string;
  expand?: boolean;
  onClick?: (id: string) => void;
}

const Item: React.SFC<IProps> = ({
  id,
  title,
  src,
  tags,
  children,
  expand,
  image,
  index,
  selected,
  onClick
}) => (
  <ItemStyled>
    <ItemContainStyled onClick={onClick ? onClick.bind(null, id) : null}>
      {!expand && (
        <ItemLeftIndexStyled>
          {selected && selected === id ? (
            <i className="fas fa-play" />
          ) : (
            index + 1
          )}
        </ItemLeftIndexStyled>
      )}
      <ItemImageStyled image={image} />
      <ItemTitleStyled>
        <h3>{title}</h3>
        <ItemTagsStyled>
          {tags.length ? <i className="fas fa-tags" /> : null}
          {tags.map((tag, tagIndex) => <span key={tagIndex}>{tag}</span>)}
        </ItemTagsStyled>
      </ItemTitleStyled>
    </ItemContainStyled>
    <ItemButtonsContainStyled>{children}</ItemButtonsContainStyled>
  </ItemStyled>
);

export default Item;
