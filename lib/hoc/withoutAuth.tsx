import React from "react";
// server cookie validations
import { getServerAuthenticationCookie } from "@lib/cookie";
// redirect
import redirect from "@lib/redirect";

const withoutAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: any) => {
    let tokenDetails: any = getServerAuthenticationCookie(ctx);

    if (tokenDetails && tokenDetails.user && tokenDetails.user.is_active) {
      redirect(ctx, "/dashboard");
    } else {
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps, tokenDetails };
    }
    return;
  };
  return Wrapper;
};

export default withoutAuth;
