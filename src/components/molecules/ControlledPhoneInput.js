import React from "react";
import { Controller } from "react-hook-form";

import PhoneInput from "./PhoneInput";

const ControlledPhoneInput = ({ name: fieldName, control, ...props }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={null}
      render={({ onChange, value, name }) => (
        <PhoneInput
          {...props}
          name={name}
          phone={value}
          onChange={({ target }) => onChange(target.value)}
        />
      )}
    />
  );
};

export default ControlledPhoneInput;
