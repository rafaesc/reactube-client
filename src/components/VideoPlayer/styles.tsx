import { StyledFunction } from "styled-components";
import styled, { device } from "../../theme";

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;

export const VideoPlayStyled = div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @media ${device.laptopS} {
    flex-direction: row;
  }
`;
