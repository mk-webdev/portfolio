import React, { useContext } from "react";
import { Context } from "../Helpers/Context";

const Error = () => {
  const setPosition = useContext(Context)[3];
  setPosition("Error");
  setTimeout(() => {
    setPosition("Home");
  }, 5000);

  return (
    <>
      <h1>Error Error</h1>
    </>
  );
};

export default Error;
