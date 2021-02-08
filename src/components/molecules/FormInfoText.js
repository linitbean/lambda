import React from "react";

import SubText from "../atoms/SubText";
import Text from "../atoms/Text";

const FormInfoText = ({ children, icon, iconStyle, ...props }) => {
  return (
    <Text p="12px 0" font="11px" flexalign {...props}>
      {icon && (
        <SubText p="0 2px 0 0" {...iconStyle}>
          *
        </SubText>
      )}

      {children}
    </Text>
  );
};

export default FormInfoText;
