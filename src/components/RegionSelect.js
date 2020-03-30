import React from "react";
import { makeStyles, FormControl, InputLabel, Select } from "@material-ui/core";

const RegionSelect = props => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor={props.htmlFor}>{props.label}</InputLabel>
      <Select
        native
        value={props.value}
        onChange={props.change}
        label={props.label}
        name={props.name}
        inputProps={{
          id: props.htmlFor
        }}
        className={classes.select}
        disabled={props.disabled}
        required
      >
        <option aria-label="None" value="" key={""} />
        {props.itemList.map(item => (
          <option value={item[props.name]} key={item[props.name]}>
            {item[props.name]}
          </option>
        ))}
      </Select>
    </FormControl>
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

export default RegionSelect;
