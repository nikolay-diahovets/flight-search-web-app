import React, { useState } from "react";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import styles from "./FlightsSortBySelect.module.scss";

const NO_OP = () => {};

// const optionsExample = [
//   { value: "price", label: "Price" },
//   { value: "best", label: "Best" },
//   { value: "duration", label: "Duration" },
//   { value: "stops", label: "Stops" },
// ];

export const FlightsSortBySelect = ({ name, label, options, onChange = NO_OP }) => {
  const [value, setValue] = useState(options[0].value);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange(value)
  };

  return (
    <FormControl className={styles.container}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        onChange={handleChange}
        value={value}
      >
        {
          options.map(({value, label}, i) => {
            return <MenuItem key={i} value={value}>{label}</MenuItem>;
          })
        }
      </Select>
    </FormControl>
  );
};
