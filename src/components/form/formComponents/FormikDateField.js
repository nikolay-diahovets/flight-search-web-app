import React from "react";
import { useField } from "formik";

import TextField from "@material-ui/core/TextField";

export const FormikDateField = ({ name, label }) => {
  const [field, { error, touched }] = useField(name);

  return (
    <TextField
      className="w-100"
      {...field}
      type="date"
      label={label}
      error={error && touched}
      helperText={error && touched ? error : ""}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
