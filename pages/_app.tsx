import { SSRProvider, OverlayProvider } from "react-aria";

import type { AppProps } from "next/app";
import NProgress from "@components/nprogress";
// import ResizeHandler from '@components/resize-handler';

// styles
import "@styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <OverlayProvider>
        <Component {...pageProps} />
        {/* <ResizeHandler /> */}
        <NProgress />
      </OverlayProvider>
    </SSRProvider>
  );
}
