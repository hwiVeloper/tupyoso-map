import React, { useEffect } from "react";
import TopBar from "./components/TopBar";
import Controls from "./components/Controls";
import KakaoMapContainer from "./container/KakaoMapContainer";

const { kakao } = window;

function App() {
  useEffect(() => {
    kakao.maps.load(() => {
      let el = document.getElementById("map");
      new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(36.61090580199106, 127.28712340471264),
        level: 13
      });
    });
  }, []);
  return (
    <>
      <TopBar />
      <Controls />
      <KakaoMapContainer />
    </>
  );
}

export default App;
