import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AppProvider from "./AppProvider";
import Navbar from "./container/Navbar/Navbar";
import MobileVideo from "./container/MobileVideo/MobileVideo";
import Home from "./screens/Home/Home";
import FullPlayer from "./screens/FullPlayer/FullPlayer";
import Search from "./screens/Search/Search";
import Edit from "./screens/Edit/Edit";
import { isMobile } from "./utils";

export default () => {
  return (
    <Router>
      <AppProvider>
        <Navbar />
        {isMobile && <MobileVideo />}
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/video/:id" component={FullPlayer} />
        <Route exact={true} path="/search/:value" component={Search} />
        <Route exact={true} path="/edit" component={Edit} />
        <Route exact={true} path="/edit/:id" component={Edit} />
      </AppProvider>
    </Router>
  );
};
