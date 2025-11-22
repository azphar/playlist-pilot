import React from "react";
import VideoCard from "./VideoCard.jsx";

function VideoGrid({ videos }) {
  if (!videos.length) {
    return (
      <div className="video-grid video-grid--empty">
        Start by searching for a video above.
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;
