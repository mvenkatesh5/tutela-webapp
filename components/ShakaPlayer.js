import React from "react";
// shaka player
import shaka from "shaka-player/dist/shaka-player.ui";
// shaka player css
import "shaka-player/dist/controls.css";

const ShakaPlayer = ({ src, config, chromeLess, className, subtitle, ...rest }) => {
  const uiContainerRef = React.useRef(null);
  const videoRef = React.useRef(null);

  const [player, setPlayer] = React.useState(null);
  const [ui, setUi] = React.useState(null);

  React.useEffect(() => {
    const player = new shaka.Player(videoRef.current);
    setPlayer(player);

    player.configure({
      streaming: {
        bufferingGoal: 20,
        alwaysStreamText: true,
      },
    });

    let ui;

    if (!chromeLess) {
      const ui = new shaka.ui.Overlay(player, uiContainerRef.current, videoRef.current);
      setUi(ui);
    }

    return () => {
      player.destroy();
      if (ui) {
        ui.destroy();
      }
    };
  }, []);

  // Keep shaka.Player.configure in sync.
  React.useEffect(() => {
    if (player && config) {
      player.configure(config);
    }
  }, [player, config]);

  const onErrorEvent = (event) => {
    onError(event.detail);
  };

  const renderSrtKind = (file) => {
    let subTitleKind = file;
    subTitleKind = subTitleKind.split(".");
    subTitleKind = subTitleKind[subTitleKind.length - 1];
    return `text/${subTitleKind}`;
  };

  // Load the source url when we have one.
  React.useEffect(() => {
    if (player && src) {
      player.addEventListener("error", onErrorEvent);
      player.load(src).then(() => {
        if (subtitle) {
          player.addTextTrackAsync(
            subtitle,
            "eng",
            "captions",
            renderSrtKind(subtitle),
            "",
            "English"
          );
          player.setTextTrackVisibility(true);
          player.selectTextLanguage("eng");
        }
      });
    }
  }, [player, src]);

  // React.useEffect(() => {
  //   let element = document.getElementsByClassName("shaka-overflow-menu-button");
  //   if (element && element.length > 0) {
  //     element[0].style.display = "none";
  //   }
  // });

  return (
    <div ref={uiContainerRef} className={className}>
      <video
        ref={videoRef}
        style={{
          maxWidth: "100%",
          width: "100%",
        }}
        {...rest}
      />
    </div>
  );
};

export default ShakaPlayer;
