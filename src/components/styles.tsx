import * as React from "react";
import { StyledFunction } from "styled-components";
import styled, { theme, device } from "../theme";
// tslint:disable:no-shadowed-variable

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;
const button: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.button;

export const PageStyled = div`
margin-top: 56px;
`;

export const SidebarStyled = div`
  position: fixed;
  width: 170px;
  background: whitesmoke;
  height: 100%;
  top: 0;
  display:block;
  @media ${device.laptopL} {
    display:none;
  }
`;

export const LayoutFullVideo = div`
  display: block;
  box-sizing: border-box;
  color: #fff;
  background-color: #000;
  position: relative;
  font-size: 10px;
  line-height: 1;
  font-family: serif;
  width: 100%;
  max-width: 100%;
  height: 0;
  padding-top: 56.25%;
`

export const PageWithSidebarStyled = styled(PageStyled)`
  background: #fafafa;
  margin-left: 170px;
  @media ${device.laptopL} {
    margin-left: 0px;
  }
`;

export const ButtonStyled = button`
  display: inline-block;
  height: 28px;
  border: solid 1px transparent;
  padding: 0 10px;
  outline: 0;
  font-weight: 500;
  font-size: 11px;
  text-decoration: none;
  white-space: nowrap;
  word-wrap: normal;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.05);
  border-color: #d3d3d3;
  background: #f8f8f8;
  color: #333;
  :hover {
    border-color: #c6c6c6;
    background: #f0f0f0;
    box-shadow: 0 1px 0 rgba(0,0,0,0.10);
  }
  :disabled {
    opacity: 0.7;
    cursor: no-drop;
    :hover {
      background: #f8f8f8;
      border-color: #d3d3d3;
    }
  }
`;

const buttonDefault: StyledFunction<
  IDivStyled & React.HTMLProps<HTMLInputElement>
> = styled(ButtonStyled);

export const ButtonPrimaryStyled = buttonDefault`
border-color: #167ac6;
background: #167ac6;
color: #fff;
padding: 0 20px;
margin-bottom:  10px;
:hover {
  background: #126db3;
  color: #fff;
  border-color: #167ac6;
}
`;

const TitleStyled = div`
font-size: 12px;
  display: inline-block;
  border-bottom: 4px solid ${() => theme.primaryColor};
  padding-bottom: 12px;
  padding-left: 15px;
  padding-right: 15px;
`;

const TitleWrapperStyled = div`
border-bottom: 1px solid #ccc;
margin-bottom: 20px;
`;

export const TitlePageStyled: React.SFC<any> = props => (
  <TitleWrapperStyled>
    <TitleStyled {...props} />
  </TitleWrapperStyled>
);

export const ContentStyled = div`
  position: relative;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1003px;
  width: 100%;
  text-align: left;
  display: flex;
`;

export const ContentDinamicStyled = styled(ContentStyled)`
  max-width: initial;
  padding-top: 40px;
  width: 1284px;
  text-align: left;
  @media ${device.laptopM} {
    width: 1070px;
  }
  @media ${device.laptopL} {
    width: 856px;
  }
  @media ${device.laptop} {
    width: auto;
  }
  @media ${device.mobileL} {
    padding-top: 0px;
  }
`;

export const ContentFullStyled = styled(ContentStyled)`
  width: 100%;
  max-width: initial;
  background: white;
  @media ${device.laptop} {
    padding-top: 0;
  }
`;

export const CardStyled = div`
  margin: 0 0 10px;
  border: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  position: relative;
  width: 1003px;
  overflow: hidden;
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 15px;
  @media ${device.laptop} {
    width: 86%;
    margin: 0 auto;
  }
`;
