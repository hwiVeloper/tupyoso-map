import {
  Backdrop,
  Button,
  CircularProgress,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { GpsFixed, Home } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { apiPost } from "../utils/api";
import RegionModal from "./RegionModal";

const Controls = (props) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = (a) => {
    setModalOpen(false);
  };

  const handleApplyRegion = (data) => {
    if (data.sdName === "") {
      alert("시도명을 선택해 주세요.");
      return false;
    } else if (data.gsgName === "") {
      alert("구시군명을 선택해 주세요.");
      return false;
    } else if (data.emdName === "") {
      alert("읍면동명을 선택해 주세요.");
      return false;
    }
    setModalOpen(false);

    setIsLoading(true);

    // api 호출
    apiPost("/region/getPollPlaces", {
      sdName: data.sdName,
      gusigunName: data.gsgName,
      emdName: data.emdName,
    })
      .then((res) => {
        props.setCenter(res.data.center);
        props.setZoomLevel(6);
        props.addMarker(res.data.pollPlaces);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(true);
          if (position !== null) {
            apiPost("/region/getPollPlacesByLocation", {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            })
              .then((res) => {
                props.setCenter(res.data.center);
                props.setZoomLevel(6);
                props.addMarker(res.data.pollPlaces);
                props.addMyLocationMarker(res.data.center);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        },
        (err) => {
          if (err.code === 1) {
            setToastOpen(true);
          }
        }
      );
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
        <Typography>데이터 로딩중...</Typography>
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={toastOpen}
        autoHideDuration={3000}
        message="위치설정을 허용 후 다시 시도해 주세요."
        onClose={() => {
          setToastOpen(false);
        }}
      />
      <div className={classes.controlsContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.gpsButton}
          startIcon={<GpsFixed />}
          onClick={handleMyLocation}
        >
          내위치
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<Home />}
          onClick={handleModalOpen}
        >
          우리동네 검색
        </Button>
        <RegionModal
          open={modalOpen}
          handleClose={handleModalClose}
          handleApply={handleApplyRegion}
        />
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  controlsContainer: {
    position: "absolute",
    marginTop: theme.mixins.toolbar.minHeight,
    top: theme.spacing(2),
    left: theme.spacing(1),
    zIndex: 1000,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    backgroundColor: "#fff",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    flexDirection: "column",
  },
  gpsButton: {
    marginRight: theme.spacing(1),
  },
}));

export default Controls;
