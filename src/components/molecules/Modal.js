import React from "react";
import { createPortal } from "react-dom";

import Container from "../atoms/Container";
import Backdrop from "../atoms/Backdrop";

const Modal = ({ open, dismiss, preventDismiss, children }) => {
  if (!open) return null;

  return createPortal(
    <Container
      flex="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      z="10"
    >
      <Backdrop open={open} onClick={preventDismiss ? undefined : dismiss} />
      {children}
    </Container>,
    document.getElementById("portal")
  );
};

export default Modal;
