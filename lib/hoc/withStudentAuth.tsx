import React from "react";
// axios configurations
import { setAxiosHeader } from "config/axios";
// server cookie validations
import { getServerAuthenticationCookie } from "@lib/cookie";
// redirect
import redirect from "@lib/redirect";

const withStudentAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    React.useEffect(() => {
      if (props.tokenDetails) {
        setAxiosHeader(props.tokenDetails.access_token);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: any) => {
    let tokenDetails: any = getServerAuthenticationCookie(ctx);
    if (tokenDetails && tokenDetails.user && tokenDetails.user.is_active) {
      if (tokenDetails.user.role === 0) {
        const componentProps =
          WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
        return { ...componentProps, tokenDetails };
      } else if (tokenDetails.user.role === 1) {
        redirect(ctx, "/calendar");
        return {};
      } else if (tokenDetails.user.role === 2) {
        redirect(ctx, "/calendar");
        return {};
      } else if (tokenDetails.user.role === 3) {
        redirect(ctx, "/parent/dashboard");
        return {};
      }
    } else {
      redirect(ctx, "/signin");
    }
  };

  return Wrapper;
};

export default withStudentAuth;
