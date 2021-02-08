import React from "react";
import { Controller } from "react-hook-form";

import WalletInput from "./WalletInput";

const ControlledWalletInput = ({ name: fieldName, control, ...props }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={null}
      render={({ onChange, value, name }) => (
        <WalletInput
          {...props}
          name={name}
          wallet={value}
          onChange={({ target }) => onChange(target.value)}
        />
      )}
    />
  );
};

export default ControlledWalletInput;
