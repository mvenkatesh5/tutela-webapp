import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://github.com/videojs/mux.js/releases/latest/download/mux.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
