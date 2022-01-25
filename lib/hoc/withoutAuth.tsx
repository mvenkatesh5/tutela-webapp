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

    if (tokenDetails && tokenDetails.user) {
      if (tokenDetails.user.role === 0) {
        redirect(ctx, "/student");
        return {};
      }
      if (tokenDetails.user.role === 1) {
        redirect(ctx, "/dashboard");
        return {};
      }
      if (tokenDetails.user.role === 2) {
        redirect(ctx, "/calendar");
        return {};
      }
      if (tokenDetails.user.role === 3) {
        redirect(ctx, "/parent/dashboard");
        return {};
      }
    } else {
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps, tokenDetails };
    }

    return {};
  };

  return Wrapper;
};

export default withoutAuth;
