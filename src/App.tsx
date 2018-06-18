import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import LocalStorageProvider from "./LocalStorageProvider";
import Navbar from "./container/Navbar/Navbar";
import Home from "./screens/Home/Home";
import FullPlayer from "./screens/FullPlayer/FullPlayer";
import Search from "./screens/Search/Search";
import Edit from "./screens/Edit/Edit";

export default () => {
  return (
    <Router>
      <LocalStorageProvider>
        <Navbar />
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/video/:id" component={FullPlayer} />
        <Route exact={true} path="/search/:value" component={Search} />
        <Route exact={true} path="/edit" component={Edit} />
        <Route exact={true} path="/edit/:id" component={Edit} />
      </LocalStorageProvider>
    </Router>
  );
};
