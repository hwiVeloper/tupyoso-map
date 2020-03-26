import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const Controls = () => {
  const classes = useStyles();
  return (
    <div className={classes.controlsContainer}>
      <Button variant="contained">버튼컨트롤 테스트</Button>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  controlsContainer: {
    position: "absolute",
    top: theme.spacing(10),
    left: theme.spacing(2),
    zIndex: 1000
  }
}));

export default Controls;
