import React, { Component } from "react";
import "./Spinner.css";
//icons from font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSpinner);

export default class Spinner extends Component {
  render() {
    return (
      // this is going to happen until the data is loaded in
      <div className="spinner-wrapper">
        <FontAwesomeIcon icon="spinner" size="6x" spin />
      </div>
    );
  }
}

/* npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome */
