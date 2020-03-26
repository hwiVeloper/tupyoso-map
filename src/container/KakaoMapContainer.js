import React, { Component } from "react";
import { Container } from "@material-ui/core";

class KakaoMapContainer extends Component {
  render() {
    return (
      <div>
        <Container disableGutters={true} maxWidth={false}>
          <div id={`map`} style={{ width: "100vw", height: "100vh" }}></div>
        </Container>
      </div>
    );
  }
}

export default KakaoMapContainer;
