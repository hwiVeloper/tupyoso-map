import { Backdrop, Button, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { apiPost } from "../utils/api";
import RegionSelect from "./RegionSelect";

const RegionModal = props => {
  const classes = useStyles();

  useEffect(() => {
    apiPost("/region/", {}).then(res => {
      setSdList(res.data);
    });
  }, []);

  const [sdName, setSdName] = useState("");
  const [gsgName, setGsgName] = useState("");
  const [emdName, setEmdName] = useState("");
  const [sdList, setSdList] = useState([]);
  const [gsgList, setGsgList] = useState([]);
  const [emdList, setEmdList] = useState([]);

  const handleSdChange = e => {
    setSdName(e.target.value);
    setGsgList([]);
    setEmdList([]);
    setGsgName("");
    setEmdName("");

    apiPost("/region/", {
      sdName: e.target.value
    }).then(res => {
      setGsgList(res.data);
    });
  };

  const handleGsgChange = e => {
    setGsgName(e.target.value);
    setEmdList([]);
    setEmdName("");
    apiPost("/region/", {
      sdName: sdName,
      gusigunName: e.target.value
    }).then(res => {
      setEmdList(res.data);
    });
  };

  const handleEmdChange = e => {
    setEmdName(e.target.value);
  };

  function resetValues() {
    setSdName("");
    setGsgList([]);
    setEmdList([]);
    setGsgName("");
    setEmdName("");
  }

  const modalBody = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <RegionSelect
        htmlFor="sd-select"
        label="시도명"
        value={sdName}
        change={handleSdChange}
        itemList={sdList}
        name="sdName"
        disabled={false}
      />
      <RegionSelect
        htmlFor="gsg-select"
        label="구시군명"
        value={gsgName}
        change={handleGsgChange}
        itemList={gsgList}
        name="gusigunName"
        disabled={sdName === ""}
      />
      <RegionSelect
        htmlFor="emd-select"
        label="읍면동명"
        value={emdName}
        change={handleEmdChange}
        itemList={emdList}
        name="emdName"
        disabled={gsgName === ""}
      />
    </div>
  );

  return (
    <Modal
      aria-labelledby="region-modal-title"
      aria-describedby="region-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      disableBackdropClick={true}
    >
      <div className={classes.paper}>
        <h2 id="region-modal-title">우리동네 검색하기</h2>
        <div id="region-modal-description">{modalBody}</div>
        <div className={classes.modalButtons}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              resetValues();
              props.handleClose();
            }}
          >
            닫기
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              props.handleApply({
                sdName: sdName,
                gsgName: gsgName,
                emdName: emdName
              });
              resetValues();
            }}
          >
            적용
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modalButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: theme.spacing(2)
  }
}));

export default RegionModal;
