import React from "react";
// axios configurations
import { setAxiosHeader } from "config/axios";
// server cookie validations
import { getServerAuthenticationCookie } from "@lib/cookie";
// redirect
import redirect from "@lib/redirect";

const withGlobalAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    React.useEffect(() => {
      if (props.tokenDetails) {
        setAxiosHeader(props.tokenDetails.access_token);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  /* 
    role and permissions of user
    0 - student
    1 - teacher
    2 - admin
    3 - parent
  */

  Wrapper.getInitialProps = async (ctx: any) => {
    let tokenDetails: any = getServerAuthenticationCookie(ctx);
    if (tokenDetails && tokenDetails.user && tokenDetails.user.is_active) {
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps, tokenDetails };
    } else {
      redirect(ctx, "/signin");
    }

    return {};
  };

  return Wrapper;
};

export default withGlobalAuth;
