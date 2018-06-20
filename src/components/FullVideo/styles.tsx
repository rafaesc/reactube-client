import * as React from "react";
import { StyledFunction } from "styled-components";
import styled, { theme, device } from "../../theme";
import { LayoutFullVideo } from "../styles";

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;
const button: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.button;

const layoutFullVideo: StyledFunction<
  IDivStyled & React.HTMLProps<HTMLInputElement>
> = styled(LayoutFullVideo);

export const VideoWrapperStyled = layoutFullVideo`
  padding-top: ${({ fullscreen }) => (fullscreen ? "0" : "56.25%")};
  height: ${({ fullscreen }) => (fullscreen ? "100%" : "auto")};
  opacity: ${({ show }) => (show ? "1" : "0")};
`;

export const VideoStyled = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BigPlayButtonStyled = button`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
cursor: auto;
`;

export const ControlBarStyled = div`
  position: absolute;
  width: 100%;
  bottom: 0;
  color: white;
  opacity: 1;
  transition-property: opacity;
  transition-duration:  ${() => theme.velocityTransition};
`;

export const ControlBarGradientStyled = div`
  width: 100%;
  position: absolute;
  background-repeat: repeat-x;
  background: -moz-linear-gradient(to bottom, rgba(0,0,0,0) 23%,rgba(0, 0, 0, 0.9) 96%);
  background: -webkit-linear-gradient(to bottom, rgba(0,0,0,0) 23%,rgba(0, 0, 0, 0.9) 96%);
  background: linear-gradient(to bottom, rgba(0,0,0,0) 23%,rgba(0, 0, 0, 0.9) 96%);
  height: 49px;
  padding-top: 49px;
  bottom: 0;
  background-position: bottom;
`;

export const ControlBarTopStyled: React.SFC<any> = props => (
  <ControlBarTopWrapperStyled>
    <ControlBarTopContainerStyled {...props} />
  </ControlBarTopWrapperStyled>
);

const ControlBarTopContainerStyled = div`
  position: relative;
`;

const ControlBarTopWrapperStyled = div`
  position: relative;
  padding: 8px;
  margin-bottom: 3px;
  text-shadow: 0 0 2px rgba(0,0,0,.5);
  z-index: 2;
`;

export const ControlBarBottomStyled = div`
  display: flex;
  padding: 8px;
  justify-content: space-between;
  text-shadow: 0 0 2px rgba(0,0,0,.5);
  z-index: 2;
`;

export const ControlBarBottomSideStyled = div`
  display: flex;
  z-index: 1;
`;

export const TitleStyled = div`
  position: absolute;
  text-shadow: 0 0 2px rgba(0,0,0,.5);
  color: white;
  z-index: 1;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 164%;
  opacity: 1;
  transition-property: opacity;
  transition-duration:  ${() => theme.velocityTransition};
`;

export const LoadingSpinnerStyled = div`
  display: ${props => (props.waiting ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  margin-left: -32px;
  z-index: 18;
`;

export const LoadingSpinnerContainer = div`
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  top: 50%;
  left: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation: spinner-linspin 1568.23529647ms linear infinite;
  -webkit-animation: spinner-linspin 1568.23529647ms linear infinite;
`;

export const LoadingSpinnerRotator = div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-animation: spinner-easespin 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both;
  animation: spinner-easespin 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both;
`;

const LoadingSpinnerSide = div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
`;

export const LoadingSpinnerCircle = div`
  box-sizing: border-box;
  position: absolute;
  width: 200%;
  height: 100%;
  border-style: solid;
  border-color: #ddd #ddd transparent;
  border-radius: 50%;
  border-width: 6px;
`;

export const LoadingSpinnerLeft = styled(LoadingSpinnerSide)`
  right: 49%;

  ${LoadingSpinnerCircle} {
    left: 0;
    right: -100%;
    border-right-color: transparent;
    -webkit-animation: spinner-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1)
      infinite both;
    animation: spinner-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite
      both;
  }
`;

export const LoadingSpinnerRight = styled(LoadingSpinnerSide)`
  left: 49%;

  ${LoadingSpinnerCircle} {
    left: -100%;
    right: 0;
    border-left-color: transparent;
    -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite
      both;
    animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  }
`;

export const ComingNextStyled = div`
  position: absolute;
  opacity: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  color: white;
  @media ${device.tablet} {
    z-index: 5;
    background: black;
  }
`;

export const ComingNextImageStyled = div`
background-repeat: no-repeat;
width: 100%;
height: 100%;
position: absolute;
background-size: cover;
background-image: url(${({ image }) => image});
background-position: center;
opacity: .4;
`;

export const ComingNextTopStyled = div`
  width: 100%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  bottom: 50%;
  margin-bottom: 48px;

  @media ${device.tablet} {
    font-size: 8px;
    margin-bottom: 29px;
  }
`;

export const ComingNextHeaderStyled = div`
  display: block;
  font-size: 140%;
  text-align: center;
  padding-bottom: 8px;
  color: rgba(255,255,255,0.7);
`;

export const ComingNextTitleStyled = div`
  display: block;
  padding: 0 10px 2px;
  text-align: center;
  font-size: 200%;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
`;

export const ComingNextAutoplayStyled = div`
position: absolute;
top: 50%;
left: 50%;
width: 64px;
height: 64px;
margin: -32px 0 0 -32px;
cursor: pointer;

@media ${device.tablet} {
  margin: -23px 0 0 -24px;
  width: 45px;
  height: 45px;
}
`;

export const ComingNextIconStyled = div`
  position: absolute;
  font-size: 33px;
  left: 18px;
  top: 14px;

  @media ${device.tablet} {
    left: 14px;
    top: 12px;
    font-size: 19px;
  }
`;

export const ComingNextBottomStyled = div`
  width: 100%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  margin-top: 48px;
  text-align: center;

  @media ${device.tablet} {
    margin-top: 27px;
  }
`;

export const ComingNextButtonStyled = div`
  display: inline-block;
  padding: 10px 20px;
  font-size: 140%;
  font-weight: 500;
  cursor: pointer;
  :hover {
    background-color: rgba(255,255,255,0.15);
    border-radius: 2px;
  }
`;

export const PlayerButtonStyled = button`
  color: ${() => theme.grayLightColor};
`;

export const VolumenMenuWrapperStyled = div`
  position: relative;
  display: flex;
  i {
    font-size: 16px;
  }
`;

export const VolumenMenuButtonStyled = div`
  width: 100px;
  margin-right: 15px;
  padding-top: 2px;
  @media ${device.laptop} {
    display:none;
  }
`;

export const VolumeIcon = styled(PlayerButtonStyled)`
  width: 30px;
  text-align: left;
  padding-left: 7px;
  padding-right: 0px;
`;

export const TextPlayerStyled = div`
  font-size: 13px;
  display: flex;
  align-self: center;
`;

export const EditButtonStyled = button`
  color: ${() => theme.grayLightColor};
  font-size: 130%;
`;

export const FragmentControlStyled = div`
  position: absolute;
  width: 100%;
  display: ${props => (props.editActive ? "block" : "none")}
`;

export const ProgressControlStyled = div`
  position: absolute;
  width: 100%;
  display: ${props => (props.show ? "none" : "block")}
`;
export const FullVideoStyled = div`
position: relative;
display: inline-block;
width: 100%;
max-width: ${({ fullscreen }) => (fullscreen ? "100%" : "900px")};
height: ${({ fullscreen }) => (fullscreen ? "100%" : "auto")};
background: black;
font-size: 11px;
margin: 0;

@media ${device.laptopS} {
  margin: 0 auto;
}

${TitleStyled}, ${ControlBarStyled} {
  opacity: ${({ showControls }) => (showControls ? "1" : "0")}
}
`;
