import React from "react";
import { useField } from "formik";
import TextField from '@material-ui/core/TextField';

const isNumberRegExp = new RegExp("^[0-9]*$");

export const FormikPhoneField = ({ name, placeholder, label }) => {
  const helpersArr = useField(name);
  const [field, { error, touched }, { setValue }] = helpersArr;

  const handleChange = (e) => {
    const { value } = e.target;

    const isNumber = isNumberRegExp.test(value);
    if (isNumber) {
      setValue(value);
    }
  };

  return (
    <TextField
      {...field}
      className="w-100"
      onChange={handleChange}
      id={name}
      type="text"
      placeholder={placeholder}
      label={label}
      error={error && touched}
      helperText={error && touched ? error : ""}
    />
  );
};
