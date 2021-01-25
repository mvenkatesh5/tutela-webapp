import { SSRProvider, OverlayProvider } from "react-aria";

import type { AppProps } from "next/app";
import NProgress from "@components/nprogress";
// import ResizeHandler from '@components/resize-handler';

// axios config
import "config/axios";

// context provider
import { GlobalContextProvider } from "@contexts/global";
// components
import ToastAlert from "@components/alert";

// styles
import "@styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <OverlayProvider>
        <GlobalContextProvider>
          <ToastAlert />
          <Component {...pageProps} />
        </GlobalContextProvider>
        {/* <ResizeHandler /> */}
        <NProgress />
      </OverlayProvider>
    </SSRProvider>
  );
}
