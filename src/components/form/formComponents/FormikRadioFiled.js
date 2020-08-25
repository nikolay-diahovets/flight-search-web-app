import React from "react";
import { useField } from "formik";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";

// const radioButtonsExample = [
//   { label: "some label", value: "some value" },
//   { label: "some label", value: "some value" },
// ];

export const FormikRadioField = ({ label, name, radioButtons }) => {
  const [field, { error, touched }] = useField(name);

  return (
    <FormControl component="fieldset" color="primary" error={error && touched}>
      <FormLabel className="mb-0" component="legend">{label}</FormLabel>
      <RadioGroup
        {...field}
        className="flex-row"
        aria-label="gender"
      >
        {
          radioButtons.map(({value, label}, i) => {
            return (
              <FormControlLabel
                key={i}
                className="mb-0"
                value={value}
                control={<Radio color="primary"/>}
                label={label}
              />
            );
          })
        }
      </RadioGroup>
      <FormHelperText>{error && touched ? error : ""}</FormHelperText>
    </FormControl>
  );
};
