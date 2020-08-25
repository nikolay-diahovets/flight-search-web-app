import React from "react";
import { useField } from "formik";
import TextField from '@material-ui/core/TextField';

export const FormikEmailField = ({ name, placeholder, label }) => {
  const helpersArr = useField(name);
  const [field, { error, touched }] = helpersArr;

  return (
    <TextField
      {...field}
      className="w-100"
      id={name}
      type="email"
      placeholder={placeholder}
      label={label}
      error={error && touched}
      helperText={error && touched ? error : ""}
    />
  );
};
