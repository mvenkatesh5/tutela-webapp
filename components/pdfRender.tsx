import React, { ReactElement } from "react";
// react pdf viewer
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps, ToolbarSlot } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFRender = (props: any) => {
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

              <div className="e-flex-item ml-auto">
                <ZoomOut />
              </div>
              <div className="e-flex-item e-text">
                <Zoom />
              </div>
              <div className="e-flex-item mr-auto">
                <ZoomIn />
              </div>

              <div className="e-flex-item">
                <EnterFullScreen />
              </div>

              {/* {props.data.allow_download && (
                <div className="e-flex-item">
                  <Download />
                </div>
              )} */}

              <div className="e-flex-item">
                <Print />
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
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        height: "750px",
      }}
    >
      <Viewer fileUrl={props.data} plugins={[defaultLayoutPluginInstance]} />
    </div>
  );
};

export default PDFRender;
