import React from "react";
import { Container } from "@material-ui/core";

export const Map = () => {
  return (
    <Container disableGutters={true} maxWidth={false}>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </Container>
  );
};
