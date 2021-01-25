import React from "react";
// components
import ToastAlert from "./ToastAlert";
// global context provider
import { globalContext } from "@contexts/global";

const ToastAlertRoot = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  return (
    <div>
      {globalState.toastAlert.length > 0 && (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            bottom: "10px",
            zIndex: 99999999999,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              minWidth: "300px",
              overflowY: "auto",
            }}
          >
            {globalState.toastAlert.map((item: any, i: any) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <ToastAlert data={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToastAlertRoot;
