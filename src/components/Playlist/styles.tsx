import * as React from "react";
import { StyledFunction } from "styled-components";
import styled, { theme, device } from "../../theme";
// tslint:disable:no-shadowed-variable

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;
const button: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.button;

export const PlaylistWrapper = div`
  width: 100%;
  display: inline-block;
  background-color: ${({ expand }) => expand ? theme.backgroundColor : theme.grayLightColor};

  @media ${device.laptopS} {
    width: ${({ expand }) => expand ? "700px" : "500px"};
  }
`;

export const PlaylistContainer = div`
    display:block;
    color: ${() => theme.defaultColor};
`;

export const PlaylistHeadStyled = div`
background: ${() => theme.grayColor};
color: ${() => theme.darkColor};
padding: 10px 15px;
display: flex;

button, a {
  color: ${() => theme.darkColor};
  font-size: 13px;
  display: inline-block;
  text-decoration: none;
  transition: all 0.2s;
  padding: 9px;
  transition: all 0.2s;
  border-radius: 5px;
  margin-right: 5px;
  background: ${() => theme.grayDarkColor};
  :hover {
    background: ${() => theme.grayDarkFocusColor};
  }
}
`;

export const PlaylistHeadItemStyled = div`
display: flex
`;

export const PlaylistSwitchStyled = div`
cursor:pointer;
color: ${() => theme.darkColor};
font-size: 13px;
margin-right: 5px;
padding: 9px;
display: flex;
align-items: center;
span {
  margin-left: 7px;
}
`;

export const PlaylistHeadButtonStyled = button`
color: ${({ active }) =>
    active ? theme.activeColor : theme.darkColor} !important;
`;

export const PlaylistBodyStyled = div`
padding: 10px;
height: auto;
overflow-y: auto;
  @media ${device.laptopM} {
    text-align: left;
    height: auto;
  }
  @media ${device.laptop} {
    height: ${({ expand }) => expand ? "auto" : "427px"};
  }
`;

export const ItemStyled = div`
display: flex;
margin-bottom: 5px;
`;

export const ItemContainStyled = div`
display: flex;
flex: 1;
align-items: center;
cursor: ${(props) => props.onClick ? 'pointer' : 'auto'};
`;

export const ItemButtonsContainStyled = div`
align-items: center;
display: flex;
button {
  padding: 9px;
  transition: all 0.2s;
  border-radius: 50%;
  margin-left: 5px;
  width: 34px;
  i {
    font-size: 15px;
    color: ${() => theme.darkColor};
  }
  :hover {
    background: ${() => theme.grayColor};
  }
}
`;

export const ItemTitleStyled = div`
padding-left: 10px;
h3 {
  margin-top: 5px;
  margin-bottom: 10px;
}
`;

export const ItemTagsStyled = div`
i {
  font-size: 12px;
  padding-right: 10px;
  color: ${() => theme.darkColor};
}
span {
  margin-right: 5px;
  padding: 5px;
  background:  ${() => theme.grayColor};
  border-radius: 7px;
  font-size: 12px;
  color: ${() => theme.darkColor};
}
`;

export const ItemLeftIndexStyled = div`
font-size: 12px;
width: 18px;
min-width: 18px;
color: ${() => theme.darkColor};
  i {
    font-size: 10px;
  }
`;
