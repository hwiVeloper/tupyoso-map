import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { renderToString } from "react-dom/server";
import Controls from "../components/Controls";
import InfoWindow from "../components/InfoWindow";
import myLoc from "../assets/mylocation.svg";

const { kakao } = window;

class KakaoMapContainer extends Component {
  state = {
    isLoading: false
  };

  map;
  markers = [];
  placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
  contentNode = document.createElement("div");
  gps;

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

  addMyLocationMarker(myLocation) {
    var imageSrc = myLoc;
    var imageSize = new kakao.maps.Size(64, 64); // 마커이미지의 크기입니다
    var imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // create marker
    var marker = new kakao.maps.Marker({
      map: this.map,
      position: new kakao.maps.LatLng(myLocation.y, myLocation.x),
      image: markerImage
    });

    this.markers.push(marker);
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
      <Container
        disableGutters={true}
        maxWidth={false}
        style={{ width: "100%", height: "100%" }}
      >
        <Controls
          setZoomLevel={level => this.setZoomLevel(level)}
          setCenter={coords => this.setCenter(coords)}
          addMarker={pollPlaces => this.addMarker(pollPlaces)}
          addMyLocationMarker={myLocation =>
            this.addMyLocationMarker(myLocation)
          }
        />
        <div id={`map`} style={{ width: "100%", height: "100%" }}></div>
      </Container>
    );
  }
}

export default KakaoMapContainer;
