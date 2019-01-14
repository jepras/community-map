import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";

/* import Header from "./common/Header"; */
import Home from "./home/HomePage";
import About from "./about/AboutPage";
import Map from "./map/MapPage";

const Root = (/* { store } */) => (
  <div>
    {/* <Provider store={store}> */}
    <Router>
      <Route path="/" component={App} />
    </Router>

    {/* </Provider> */}
  </div>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
