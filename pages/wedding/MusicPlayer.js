import React from "react";
import YouTube from "react-youtube";

const MusicPlayer = ({ videoId }) => {
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      enablejsapi: 1,
      origin: typeof window !== "undefined" && window.location.origin,
    },
    onReady: (event) => {
      event.target.mute();
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default MusicPlayer;
