import { Button, makeStyles, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React, { useState } from "react";
import RegionModal from "./RegionModal";

const Controls = props => {
  const classes = useStyles();

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

    props.setZoomLevel(5);

    // api 호출

    // 지도
  };

  return (
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
      <Typography>a</Typography>
      <RegionModal
        open={modalOpen}
        handleClose={handleModalClose}
        handleApply={handleApplyRegion}
      />
    </div>
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
  }
}));

export default Controls;
