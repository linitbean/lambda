import React from "react";
import { Controller } from "react-hook-form";

import CardInput from "./CardInput";

const ControlledCardInput = ({ name: fieldName, control, ...props }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={null}
      render={({ onChange, value, name }) => (
        <CardInput
          {...props}
          name={name}
          card={value}
          onChange={({ target }) => onChange(target.value)}
        />
      )}
    />
  );
};

export default ControlledCardInput;
