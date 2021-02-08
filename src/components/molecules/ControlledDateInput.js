import React from "react";
import { Controller } from "react-hook-form";

import DateInput from "./DateInput";

const ControlledDateInput = ({ name: fieldName, control, ...props }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={null}
      render={({ onChange, value, name }) => (
        <DateInput
          {...props}
          name={name}
          date={value}
          onChange={({ target }) => onChange(target.value)}
        />
      )}
    />
  );
};

export default ControlledDateInput;
