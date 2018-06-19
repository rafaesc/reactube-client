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
import AppProvider, { IAppProvider } from "../../AppProvider";

interface IProps extends RouteComponentProps<any>, IAppProvider {}

const Navbar = withRouter(({ history, location, resetDatabase }: IProps) => {
  const handleRecover = () => {
    resetDatabase();
  };

  const isInVideoPage = location.pathname.indexOf("/video") > -1;

  return (
    <NavbarStyled gray={isInVideoPage}>
      <NavbarLogoStyled gray={isInVideoPage}>
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
          <i className="fas fa-plus" /> <span>Add videos</span>
        </Link>
      </NavBarLink>
      <NavbarButtonStyled onClick={handleRecover}>
        <i className="fas fa-download" /> <span>Recover localstorage</span>
      </NavbarButtonStyled>
    </NavbarStyled>
  );
});

export default () => (
  <AppProvider.Consumer>
    {(value: IAppProvider) => <Navbar {...value} />}
  </AppProvider.Consumer>
);
