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
const size = {
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
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopS: `(min-width: ${size.laptopS})`,
  laptopM: `(min-width: ${size.laptopM})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export interface IThemeInterface {
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
  activeColor: "#35a9ff",
  backgroundColor: "#fafafa",
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
