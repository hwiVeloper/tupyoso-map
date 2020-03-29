import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const Controls = () => {
  const classes = useStyles();

  const [sdName, setSdName] = useState("");
  const [gsgName, setGsgName] = useState("");
  const [emdName, setEmdName] = useState("");
  const [sdList, setSdList] = useState([]);
  const [gsgList, setGsgList] = useState([]);
  const [emdList, setEmdList] = useState([]);

  useEffect(() => {
    Axios.post("url" + "/region/", {}).then(res => {
      setSdList(res.data);
    });
  }, []);

  const handleSdChange = e => {
    setSdName(e.target.value);
    setGsgList([]);
    setEmdList([]);
    setGsgName("");
    setEmdName("");
    Axios.post("url" + "/region/", {
      sdName: e.target.value
    }).then(res => {
      setGsgList(res.data);
    });
  };

  const handleGsgChange = e => {
    setGsgName(e.target.value);
    setEmdList([]);
    setEmdName("");
    Axios.post("url" + "/region/", {
      sdName: sdName,
      gusigunName: e.target.value
    }).then(res => {
      setEmdList(res.data);
    });
  };

  const handleEmdChange = e => {
    setEmdName(e.target.value);
    Axios.post("url" + "/region/", {
      sdName: sdName,
      gusigunName: gsgName,
      emdName: e.target.value
    }).then(res => {
      console.log(res.data[0].sggName);
    });
  };

  return (
    <div className={classes.controlsContainer}>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="sd-select">시도명</InputLabel>
          <Select
            native
            value={sdName}
            onChange={handleSdChange}
            label="시도명"
            name="sdName"
            inputProps={{
              id: "sd-select"
            }}
            className={classes.select}
          >
            <option aria-label="None" value="" key={""} />
            {sdList.map(item => (
              <option value={item.sdName} key={item.sdName}>
                {item.sdName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="gsg-select">구시군명</InputLabel>
          <Select
            native
            value={gsgName}
            onChange={handleGsgChange}
            label="구시군명"
            name="gsgName"
            inputProps={{
              id: "gsg-select"
            }}
            className={classes.select}
            disabled={sdName === ""}
          >
            <option aria-label="-" value="" />
            {gsgList.map(item => (
              <option value={item.gusigunName} key={item.gusigunName}>
                {item.gusigunName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="emd-select">읍면동명</InputLabel>
          <Select
            native
            value={emdName}
            onChange={handleEmdChange}
            name="emdName"
            label="읍면동명"
            inputProps={{
              id: "emd-select"
            }}
            className={classes.select}
            disabled={gsgName === ""}
          >
            <option aria-label="-" value="" />
            {emdList.map(item => (
              <option value={item.emdName} key={item.emdName}>
                {item.emdName}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  controlsContainer: {
    position: "absolute",
    top: theme.spacing(10),
    left: theme.spacing(2),
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
