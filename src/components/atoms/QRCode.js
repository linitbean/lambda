import React from "react";
import styled from "styled-components";
import { QRCode as QRCodeSVG } from "react-qr-svg";

const Wrapper = styled(QRCodeSVG)`
  width: 240px;
  border-radius: 4px;

  .qrcode-cell {
    opacity: 1;
  }

  .qrcode-cell-empty {
    fill: transparent;
  }

  .qrcode-cell-filled {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

const QRCode = (props) => {
  return <Wrapper cellClassPrefix="qrcode" {...props} />;
};

export default QRCode;
