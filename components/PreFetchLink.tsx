import React from "react";
// next imports
import Link from "next/link";
import { withRouter } from "next/router";
import { Children } from "react";

const PreFetchLink = withRouter<any>(({ router, children, ...props }) => (
  <Link {...props}>
    <a target={props.target ? props.target : "_self"}>
      {React.cloneElement(Children.only(children), {
        className:
          router.pathname && router.pathname.includes(props.href) ? ` nav-link-active fw-bold p-2` : `fw-bold text-muted nav-link`,
        onMouseEnter: () => {
          router.prefetch(props.href);
        },
      })}
    </a>
  </Link>
));

export default PreFetchLink;
