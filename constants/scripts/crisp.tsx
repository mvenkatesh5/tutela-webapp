import { useEffect } from "react";
// crisp global imports
import { CRISP_WEBSITE_ID, getCurrentUser } from "@constants/global";

declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: any;
  }
}

const Crisp = () => {
  const validateCurrentUser = () => {
    const currentUser: any = getCurrentUser() ? getCurrentUser() : null;
    if (currentUser && currentUser.user && currentUser.user.email) {
      return currentUser.user.email;
    }
    return null;
  };

  useEffect(() => {
    if (typeof window) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
      (function () {
        var d = document;
        var s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = true;
        d.getElementsByTagName("head")[0].appendChild(s);
        // defining email when logged in
        if (validateCurrentUser()) {
          window.$crisp.push(["set", "user:email", [validateCurrentUser()]]);
          window.$crisp.push(["do", "chat:hide"]);
        }
      })();
    }
  }, []);

  return <></>;
};
export default Crisp;
