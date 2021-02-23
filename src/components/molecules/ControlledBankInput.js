import React from "react";
import { Controller } from "react-hook-form";

import BankInput from "./BankInput";

const ControlledBankInput = ({ name: fieldName, control, ...props }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={null}
      render={({ onChange, value, name }) => (
        <BankInput
          {...props}
          name={name}
          bank={value}
          onChange={({ target }) => onChange(target.value)}
        />
      )}
    />
  );
};

export default ControlledBankInput;
