import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

// tslint:disable:object-literal-sort-keys
export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopS: "1300px",
  laptopL: "1440px",
  laptopM: "1600px",
  desktop: "2560px"
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopM: `(max-width: ${size.laptopM})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};

export interface IThemeInterface {
  velocityTransition: string;
  activeColor: string;
  backgroundColor: string;
  darkColor: string;
  defaultColor: string;
  grayColor: string;
  grayDarkColor: string;
  grayDarkFocusColor: string;
  grayLightColor: string;
  primaryColor: string;
}

export const theme = {
  velocityTransition: ".2s",
  activeColor: "#35a9ff",
  backgroundColor: "#fafafa",
  darkHeader: "#333333",
  darkColor: "#878687",
  defaultColor: "#161616",
  grayColor: "#eeeeee",
  grayDarkColor: "#e6e6e6",
  grayDarkFocusColor: "#e2e2e2",
  grayLightColor: "#f5f5f5",
  primaryColor: "#35a9ff"
};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
