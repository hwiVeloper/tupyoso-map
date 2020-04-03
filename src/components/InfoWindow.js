import React from "react";
import { makeStyles } from "@material-ui/core";
import "./InfoWindow.css";

const InfoWindow = props => {
  const placeInfo = props.data;
  return (
    <div class="placeinfo_wrap">
      <div class="placeinfo">
        <h6 class="title" href="" target="_blank">
          {placeInfo.evPsName}
        </h6>
        <span>{placeInfo.addr}</span>
        <span class="jibun">{placeInfo.placeName}</span>
        <span>{placeInfo.floor}</span>
        <span class="tel">{placeInfo.evPsName}</span>
      </div>
      <div class="after"></div>
    </div>
  );
};

export default InfoWindow;
