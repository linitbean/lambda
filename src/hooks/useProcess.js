import { useState } from "react";

export const useProcess = () => {
  const [show, setShow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState("Processing...");
  const [success, setSuccess] = useState(false);

  const start = () => {
    setShow(true);
    setResponse("Processing...");
    setSuccess(false);
    setProcessing(true);
  };

  const complete = (mssg) => {
    setResponse(mssg || "Request successful");
    setSuccess(true);
    setProcessing(false);
  };

  const fail = (mssg) => {
    setResponse(mssg || "Something went wrong");
    setProcessing(false);
  };

  const close = () => setShow(false);

  return { show, processing, response, success, start, complete, fail, close };
};
