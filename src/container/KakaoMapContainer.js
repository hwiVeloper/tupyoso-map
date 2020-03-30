import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Controls from "../components/Controls";

class KakaoMapContainer extends Component {
  map;

  componentDidMount() {
    const { kakao } = window;
    let el = document.getElementById("map");
    this.map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(36.61090580199106, 127.28712340471264),
      level: 13
    });
  }

  setZoomLevel(level) {
    console.log(this.map);
    this.map.setLevel(level);
  }

  render() {
    return (
      <>
        <Controls setZoomLevel={level => this.setZoomLevel(level)} />
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
