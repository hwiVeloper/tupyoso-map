import { Container } from "@material-ui/core";
import React, { Component } from "react";
import Controls from "../components/Controls";
import { InfoWindow } from "../components/InfoWindow";
import { render } from "react-dom";

const { kakao } = window;

class KakaoMapContainer extends Component {
  map;
  markers = [];
  openedInfoWindow = null;

  componentDidMount() {
    let el = document.getElementById("map");
    this.map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(36.61090580199106, 127.28712340471264),
      level: 13
    });
  }

  setZoomLevel(level) {
    this.map.setLevel(level);
  }

  setCenter(coords) {
    this.map.setCenter(new kakao.maps.LatLng(coords.y, coords.x));
  }

  addMarker(pollPlaces) {
    this.deleteMarkers();
    this.markers = [];

    for (let i = 0; i < pollPlaces.length; i++) {
      // create marker
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(pollPlaces[i].y, pollPlaces[i].x),
        clickable: true
      });

      this.markers.push(marker);
    }
  }

  deleteMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  render() {
    return (
      <>
        <Controls
          setZoomLevel={level => this.setZoomLevel(level)}
          setCenter={coords => this.setCenter(coords)}
          addMarker={pollPlaces => this.addMarker(pollPlaces)}
        />
        <div>
          <Container disableGutters={true} maxWidth={false}>
            <div id={`map`} style={{ width: "100vw", height: "100vh" }}></div>
          </Container>
        </div>
      </>
    );
  }
}

export default KakaoMapContainer;
