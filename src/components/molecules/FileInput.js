import React, { useRef } from "react";

import Container from "../atoms/Container";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

const FileInput = ({
  accept,
  capture,
  onChange,
  buttonStyle,
  textStyle,
  ...props
}) => {
  const inputRef = useRef();

  const inputClick = () => inputRef.current.click();

  const fileName =
    inputRef.current && inputRef.current.value.split(/(\\|\/)/g).pop();

  return (
    <Container p="12px" flex="space-between" wide {...props}>
      <Button p="8px 16px" min="110px" {...buttonStyle} onClick={inputClick}>
        Choose a file
      </Button>
      <Text p="0 12px" {...textStyle}>
        {fileName || "No file selected"}
      </Text>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        capture={capture}
        onChange={onChange}
        hidden
      />
    </Container>
  );
};

export default FileInput;
