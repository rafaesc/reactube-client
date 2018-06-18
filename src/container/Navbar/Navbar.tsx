import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";
import {
  NavbarStyled,
  NavbarLogoStyled,
  NavBarLink,
  NavbarButtonStyled
} from "./styles";
import SearchBox from "./SearchBox";
import LocalStorageProvider, {
  ILocalStorageProvider
} from "../../LocalStorageProvider";

interface IProps extends RouteComponentProps<any>, ILocalStorageProvider {}

const Navbar = withRouter(({ history, resetDatabase }: IProps) => {
  const handleRecover = () => {
    resetDatabase();
  };

  return (
    <NavbarStyled>
      <NavbarLogoStyled>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47328 33689">
            <rect
              fill="#35a9ff"
              x="250"
              y="250"
              width="46828"
              height="33189"
              rx="6444"
              ry="6444"
            />
            <polygon
              fill="#F6F4EC"
              points="18549,7972 18549,25476 32726,17291 "
            />
          </svg>
        </Link>
      </NavbarLogoStyled>
      <SearchBox history={history} />
      <NavBarLink>
        <Link to="/edit">
          <i className="fas fa-plus" /> Add videos
        </Link>
      </NavBarLink>
      <NavbarButtonStyled onClick={handleRecover}>
        <i className="fas fa-download" /> Recover localstorage
      </NavbarButtonStyled>
    </NavbarStyled>
  );
});

export default () => (
  <LocalStorageProvider.Consumer>
    {(value: ILocalStorageProvider) => <Navbar {...value} />}
  </LocalStorageProvider.Consumer>
);
