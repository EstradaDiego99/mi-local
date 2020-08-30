import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar nav">
          <a className="nav-link" href="/">
            <img
              src="https://image.flaticon.com/icons/svg/904/904140.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
              loading="lazy"
            ></img>
          </a>
          <a className="nav-link" href="/">
            MI LOCAL
          </a>
        </nav>
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
}

export default App;
