import { StyledFunction } from "styled-components";
import styled, { device } from "../../theme";
import { EditButtonStyled } from "../../components/FullVideo/styles";

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;

export const MobileVideoStyled = div`
position: fixed;
bottom: 0;
top: 65%;
height: 152px;
width: 270px;
right: 0;
z-index: 1;
opacity: 1;
transition: all 0.4s;

${EditButtonStyled} {
  display: none;
}
`;
