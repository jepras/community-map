import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./common/Header";

const App = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

/* function mapStateToProps(state, ownProps) {
  return {};
} */

export default App;
