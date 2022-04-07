import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
//import './styles/main.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
