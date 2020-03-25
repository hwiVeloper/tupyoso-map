/* global kakao */
import React, { Component } from "react";
import "./App.css";
import { Map } from "./components/Map";

class App extends Component {
  map;
  markers = [];
  infowindows = [];

  componentDidMount() {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.5668260054857, 126.978656785931),
      level: 13
    };
    this.map = new kakao.maps.Map(container, options);
  }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default App;
