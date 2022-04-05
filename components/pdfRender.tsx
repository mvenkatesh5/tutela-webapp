import React, { ReactElement } from "react";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";
// react pdf viewer
import { Viewer, RenderPage, RenderPageProps } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps, ToolbarSlot } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const PDFRender = (props: any) => {
  const [tokenDetails, setTokenDetails] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const renderPdfPage: RenderPage = (props: RenderPageProps) => (
    <>
      {props.canvasLayer.children}
      {props.annotationLayer.children}
      {props.textLayer.children}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 99999,
        }}
      >
        <div
          style={{
            color: "rgba(0, 0, 0, 0.2)",
            transform: "rotate(-45deg)",
            userSelect: "none",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: `${6 * props.scale}rem`, fontWeight: "bold" }}>TUTELA</div>
          <div style={{ fontSize: `${1 * props.scale}rem`, fontWeight: "bold" }}>
            Licensed to {tokenDetails?.user?.email}
          </div>
        </div>
      </div>
    </>
  );

  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div className="e-pdf-block-toolbar">
            <div className="e-flex-container">
              <div className="e-flex-item">
                <ShowSearchPopover />
              </div>
              <div className="e-flex-item">
                <GoToPreviousPage />
              </div>
              <div className="e-flex-item e-inner-flex-container">
                <div className="e-flex-item">
                  <CurrentPageInput />
                </div>
                <div className="e-flex-item">/</div>
                <div className="e-flex-item">
                  <NumberOfPages />
                </div>
              </div>
              <div className="e-flex-item">
                <GoToNextPage />
              </div>

              <div className="e-flex-item ms-auto">
                <ZoomOut />
              </div>
              <div className="e-flex-item e-text">
                <Zoom />
              </div>
              <div className="e-flex-item me-auto">
                <ZoomIn />
              </div>

              <div className="e-flex-item">
                <EnterFullScreen />
              </div>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [
      // Remove the attachments tab (`defaultTabs[2]`)
      defaultTabs[0], // Bookmarks tab
      // defaultTabs[1], // Thumbnails tab
    ],
  });

  return (
    <>
      <Viewer
        fileUrl={props.pdf_url}
        plugins={[defaultLayoutPluginInstance]}
        renderPage={renderPdfPage}
      />
    </>
  );
};

export default PDFRender;
