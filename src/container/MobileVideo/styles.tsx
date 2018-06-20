import { StyledFunction } from "styled-components";
import styled, { device, theme } from "../../theme";
import { EditButtonStyled } from "../../components/FullVideo/styles";

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;

export const MobileVideoStyled = div`
position: ${({ top }) => (top ? "absolute" : "fixed")};
bottom: 0;
top: ${({ top }) => (top ? "208px" : "100%")};
margin-top: -152px;
height: 152px;
width: ${({ top }) => (top ? "100%" : "270px")};
right: 0;
z-index: 1;
opacity: 1;
transition: all 0.2s;

${EditButtonStyled} {
  display: none;
}
`;

export const MobileVideoWrapperStyled = div`
width: 100%;
padding: 0px;
display: flex;
`;

export const MobileVideoCloseStyled = div`
position: absolute;
left: -26px;
background: white;
font-size: 17px;
width: 26px;
height: 26px;
padding-top: 5px;
color: ${() => theme.primaryColor};
text-align: center;
`;
