import React, { Component } from "react";
import "./City.css";
import { Link } from "react-router-dom";

export default class City extends Component {
  render() {
    //if reccities doesn't actually get put into the DOM the component never actually gets built
    console.log(this.props.city);

    const { cityName, image, price, id } = this.props.city;

    return (
      <div className="city col s12">
        <Link to={`/city/${id}`}>
          <div className="image">
            <img src={image} alt="" />
            <div className="city-name">{cityName}</div>
            <div className="price">${price}/night average</div>
          </div>
        </Link>
      </div>
    );
  }
}
