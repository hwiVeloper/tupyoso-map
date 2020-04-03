import { Container } from "@material-ui/core";
import React, { Component } from "react";
import Controls from "../components/Controls";
import { renderToString } from "react-dom/server";
import InfoWindow from "../components/InfoWindow";

const { kakao } = window;

class KakaoMapContainer extends Component {
  map;
  markers = [];
  placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
  contentNode = document.createElement("div");

  componentDidMount() {
    let el = document.getElementById("map");
    this.map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(36.61090580199106, 127.28712340471264),
      level: 13
    });
    this.placeOverlay.setContent(this.contentNode);

    var po = this.placeOverlay;

    kakao.maps.event.addListener(this.map, "zoom_changed", function() {
      if (po.setMap) {
        po.setMap(null);
      }
    });
    kakao.maps.event.addListener(this.map, "bounds_changed", function() {
      if (po.setMap) {
        po.setMap(null);
      }
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

      // click event
      (function(marker, pollPlace, that) {
        kakao.maps.event.addListener(marker, "click", function() {
          that.displayPlaceInfo(pollPlace);
        });
      })(marker, pollPlaces[i], this);

      this.markers.push(marker);
    }
  }

  deleteMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  displayPlaceInfo(place) {
    var content = renderToString(<InfoWindow data={place} />);

    this.contentNode.innerHTML = content;
    this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    this.placeOverlay.setMap(this.map);
  }

  removePlaceInfo() {
    this.placeOverlay.setMap(null);
  }

  render() {
    return (
      <>
        {/* <div> */}
        <Container disableGutters={true} maxWidth={false}>
          <Controls
            setZoomLevel={level => this.setZoomLevel(level)}
            setCenter={coords => this.setCenter(coords)}
            addMarker={pollPlaces => this.addMarker(pollPlaces)}
          />
          <div id={`map`} style={{ width: "100vw", height: "100vh" }}></div>
        </Container>
        {/* </div> */}
      </>
    );
  }
}

export default KakaoMapContainer;
