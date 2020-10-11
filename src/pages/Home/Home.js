import React, { Component } from "react";
import "./Home.css";
import SearchBox from "./SearchBox";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";
import Cities from "../../utility/City/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/Venue/Venues";

export default class Home extends Component {
  state = {
    cities: [],
    europeCities: {},
    asiaCities: {},
    exoticCities: {},
    activities: [],
    recVenues: {},
  };

  //async means somewhere in this function the key word 'await' is coming
  async componentDidMount() {
    const citiesUrl = `${window.apiHost}/cities/recommended`;
    const europeCitiesUrl = `${window.apiHost}/cities/europe`;
    const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
    const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

    const citiesPromises = [];
    //issue the requests
    citiesPromises.push(axios.get(citiesUrl));
    citiesPromises.push(axios.get(europeCitiesUrl));
    citiesPromises.push(axios.get(asiaCitiesUrl));
    citiesPromises.push(axios.get(exoticCitiesUrl));

    //wait for all of them to finish before running the call back that goes inside the then
    Promise.all(citiesPromises).then((data) => {
      //console.log(data[0].data);
      const recommendedCities = data[0].data;
      const europeCities = data[1].data;
      const asiaCities = data[2].data;
      const exoticCities = data[3].data;
      console.log(europeCities);

      // console.log(recommendedCities.data);
      this.setState({
        cities: recommendedCities,
        europeCities,
        asiaCities,
        exoticCities,
      });
    });

    //link is in index.html
    const activitiesUrl = `${window.apiHost}/activities/today`;
    const activities = await axios(activitiesUrl);
    this.setState({
      activities: activities.data,
    });

    const recVenuesUrl = `${window.apiHost}/venues/recommended`;
    const venues = await axios(recVenuesUrl);
    //console.log(venues);

    this.setState({
      recVenues: venues.data,
    });
  }

  render() {
    //  console.log(this.state.cities);
    console.log(this.state.activities);

    //after the component mounts, the api will always return something
    if (this.state.cities.length === 0 || !this.state.recVenues.venues) {
      return <Spinner />;
    }

    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="home col s12">
              <div className="upper-fold">
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid lower-fold">
          <div className="row">
            <div className="col s12">
              {/* Cities component will render on the home page, send down a prop of cities */}
              <Cities
                cities={this.state.cities}
                header="Recommended Cities For You"
              />
            </div>

            <div className="col s12">
              <Activities
                activities={this.state.activities}
                header="Today in your area"
              />
            </div>

            <div className="col s12">
              <Cities
                cities={this.state.europeCities.cities}
                header={this.state.europeCities.header}
              />
            </div>

            <div className="col s12">
              <Venues
                venues={this.state.recVenues.venues}
                header={this.state.recVenues.header}
              />
            </div>

            <div className="col s12">
              <Cities
                cities={this.state.asiaCities.cities}
                header={this.state.asiaCities.header}
              />
            </div>

            <div className="col s12">
              <Cities
                cities={this.state.exoticCities.cities}
                header={this.state.exoticCities.header}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
