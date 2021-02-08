import React from "react";
import ReactPhoneInput from "react-phone-number-input/input";

import Input from "../atoms/Input";

const PhoneInput = ({ phone, onChange, name, ...props }) => {
  const change = (value) => {
    return onChange({
      target: {
        name: name,
        type: "phone",
        value,
      },
    });
  };

  return (
    <ReactPhoneInput
      international
      withCountryCallingCode
      defaultCountry="US"
      inputComponent={Input}
      value={phone}
      onChange={change}
      {...props}
    />
  );
};

export default PhoneInput;
