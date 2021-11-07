import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    // set timeout for alerting
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);

    // cleanup func
    return () => clearTimeout(timeOut);
  }, [list]);
  // list state value as dependency in order to run setTimeout again every time the list
  //changes/updates, so each alert get it's own 3000 ms

  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
