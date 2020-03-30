import React, { Component } from "react";
import TopBar from "./components/TopBar";
import KakaoMapContainer from "./container/KakaoMapContainer";

class App extends Component {
  render() {
    return (
      <>
        <TopBar />
        <KakaoMapContainer />
      </>
    );
  }
}

export default App;
