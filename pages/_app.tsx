import dynamic from "next/dynamic";
import { SSRProvider, OverlayProvider } from "react-aria";
import type { AppProps } from "next/app";
import NProgress from "@components/nprogress";
import Head from "next/head";
// import ResizeHandler from '@components/resize-handler';
// axios config
import "config/axios";
// context provider
import { GlobalContextProvider } from "@contexts/global";
import { MeetContextProvider } from "@contexts/MeetContextProvider";
import { AppStateProvider } from "@contexts/AppStateProvider";
import { MeetingProvider, lightTheme } from "amazon-chime-sdk-component-library-react";
// components
import ToastAlert from "@components/alert";
import { ThemeProvider } from "styled-components";
const CrispWithNoSSR = dynamic(() => import("@constants/scripts/crisp"), { ssr: false });
// styles
import "@styles/main.css";
import "@styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* google tag manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y1HBDZV751" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y1HBDZV751');`,
          }}
        />
      </Head>
      <SSRProvider>
        <OverlayProvider>
          <GlobalContextProvider>
            <AppStateProvider>
              <MeetContextProvider>
                <ThemeProvider theme={lightTheme}>
                  <CrispWithNoSSR />
                  <ToastAlert />
                  {/* @ts-ignore */}
                  <MeetingProvider>
                    <Component {...pageProps} />
                  </MeetingProvider>
                </ThemeProvider>
              </MeetContextProvider>
            </AppStateProvider>
          </GlobalContextProvider>
          {/* <ResizeHandler /> */}
          <NProgress />
        </OverlayProvider>
      </SSRProvider>
    </>
  );
}
