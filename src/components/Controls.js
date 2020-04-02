import {
  Backdrop,
  Button,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React, { useState } from "react";
import { apiPost } from "../utils/api";
import RegionModal from "./RegionModal";

const Controls = props => {
  const classes = useStyles();

  const { kakao } = window;

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = a => {
    setModalOpen(false);
  };

  const handleApplyRegion = data => {
    if (data.sdName === "") {
      alert("시도명을 선택해 주세요.");
      return;
    } else if (data.gsgName === "") {
      alert("구시군명을 선택해 주세요.");
      return;
    } else if (data.emdName === "") {
      alert("읍면동명을 선택해 주세요.");
      return;
    }
    setModalOpen(false);

    setIsLoading(true);

    // api 호출
    apiPost("/region/getPollPlaces", {
      sdName: data.sdName,
      gusigunName: data.gsgName,
      emdName: data.emdName
    })
      .then(res => {
        props.setCenter(res.data.center);
        props.setZoomLevel(6);
        props.addMarker(res.data.pollPlaces);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.controlsContainer}>
        <Button
          variant="contained"
          color="primary"
          size="small"
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

const useStyles = makeStyles(theme => ({
  controlsContainer: {
    position: "absolute",
    marginTop: theme.mixins.toolbar.minHeight,
    top: theme.spacing(2),
    left: theme.spacing(1),
    zIndex: 1000
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  select: {
    backgroundColor: "#fff"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export default Controls;
