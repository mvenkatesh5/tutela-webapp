import React from "react";
// global imports
import { SMARTLOOK_KEY } from "@constants/global";

type SmartlookWindow = Window & { smartlook?: any };

const SmartLook = () => {
  React.useEffect(() => {
    const w = window as SmartlookWindow;
    if (w.smartlook) {
      throw "Smartlook client is already initialized.";
    }
    w.smartlook = function () {
      w.smartlook.api.push(arguments);
    };
    w.smartlook.api = [];
    w.smartlook("init", SMARTLOOK_KEY);

    const head = window.document.getElementsByTagName("head")[0];
    const script = window.document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.crossOrigin = "anonymous";
    script.src = "https://rec.smartlook.com/recorder.js";
    head.appendChild(script);
  }, []);

  return <div></div>;
};

export default SmartLook;
