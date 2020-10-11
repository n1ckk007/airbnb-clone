import React from "react";
import City from "./City";
import SlickSlider from "../Slider/Slider";

export default function Cities(props) {
  const cities = props.cities.map((city, i) => {
    return (
      <div key={i} className="col s3">
        <City city={city} />
      </div>
    );
  });
  //  cities is rendering slickslider,  slickslider is going to get a prop called elements, elements is going to equal cities.
  // cities is equal to map through the cities that were sent down by home. build multiple individual divs with city components inside of them
  return (
    <div className="cities-wrapper">
      <h1 className="main-header-text">{props.header}</h1>
      <SlickSlider elements={cities} />
    </div>
  );
}
