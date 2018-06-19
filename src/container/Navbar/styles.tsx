import * as React from "react";
import { StyledFunction } from "styled-components";
import {
  InputLabelGeneralStyled,
  InputStyled
} from "../../components/Form/styles";
import styled, { theme, device } from "../../theme";
// tslint:disable:no-shadowed-variable

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;
const button: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.button;
const form: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.form;

export const NavbarStyled: React.SFC<any> = props => (
  <NavbarWrapperStyled>
    <NavbarContainerStyled {...props} />
  </NavbarWrapperStyled>
);

export const NavbarWrapperStyled = div`
position: fixed;
top: 0;
width: 100%;
z-index: 50;
background: #ffffff;
:after {
    bottom: -5px;
    box-shadow: inset 0px 4px 8px -3px rgba(17, 17, 17, .06);
    content: "";
    height: 5px;
    left: 0px;
    opacity: 1;
    position: absolute;
    right: 0px;
    width: 100%;
}
${InputLabelGeneralStyled} {
  margin: 0;
  @media ${device.laptop} {
    overflow: hidden;
    border-radius: 2px;
  }
  input {
    margin: 0;
    font-size: 16px;
    line-height: 24px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-right: none;
    box-shadow: inset 0 1px 2px #eeeeee;
    padding: 2px 11px;
    border-radius: 2px 0 0 2px;
    width: 400px;
    @media ${device.laptop} {
      width: 95%;
      border-radius: 2px;
      border-width: 0px;
      margin-left: 5px;
    }
  }
}
`;

export const NavbarContainerStyled = div`
height: 56px;
padding: 0 16px;
display: flex;
flex-direction: row;
align-items: center;
flex-wrap: wrap;
@media ${device.laptop} {
  padding: 0 5px;
  background-color: ${({ gray }) =>
    gray ? theme.darkHeader : theme.primaryColor}
}
`;

export const NavbarLogoStyled = div`
height: 24px;
width: 40px;
cursor: pointer;
svg {
  width: 100%;
  height: 100%;
  @media ${device.laptop} {
    rect {
      fill: white;
    }
    polygon {
      fill: ${({ gray }) => (gray ? theme.darkHeader : theme.primaryColor)}
    }
  }
}
`;

export const NavBarLink = div`
margin-right: 5px;
a {
  cursor: pointer;
  border: 1px solid #d3d3d3;
  background-color: #f8f8f8;
  color: ${() => theme.darkColor}
  border-radius: 2px;
  margin: 0;
  padding: 6px 20px;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  :hover {
    border-color: #c6c6c6;
    background-color: #f0f0f0;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.10);
    @media ${device.laptop} {
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  }
  @media ${device.laptop} {
    background: transparent;
    border-color: transparent;
    color: white;
    padding: 6px 11px;
  }
}
@media ${device.laptop} {
  span {
    display: none;
  }
}
`;

export const NavbarButtonStyled = button`
cursor: pointer;
border: 1px solid #d3d3d3;
background-color: #f8f8f8;
color: ${() => theme.darkColor}
border-radius: 2px;
margin: 0;
padding: 6px 20px;
:hover {
  border-color: #c6c6c6;
  background-color: #f0f0f0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.10);
  @media ${device.laptop} {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
}
@media ${device.laptop} {
  background: transparent;
  border-color: transparent;
  color: white;
  padding: 6px 11px;
  span {
    display: none;
  }
}
`;

export const navbarButton: StyledFunction<
  IDivStyled & React.HTMLProps<HTMLInputElement>
> = styled(NavbarButtonStyled);

export const SearchBoxStyled = div`
margin: 0 40px;
display: flex;

@media ${device.laptop} {
  margin: 0;
  flex: 1;
  padding-right: 7px;
}
`;

export const SearchBoxFormStyled = form`
display: flex;
flex-direction: row;
`;

export const SearchBoxButtonStyled = navbarButton`
border-radius: 0 2px 2px 0;
width: 65px;
padding: 0px;
@media ${device.laptop} {
  border-color: transparent;
  background-color: transparent;
  color: white;
  width: 43px;
}
`;
