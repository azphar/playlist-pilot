import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

function VideoCard({ video }) {
  const { addToPlaylist } = usePlaylist();

  function handleAdd() {
    addToPlaylist(video);
  }

  return (
    <div className="video-card">
      <div className="video-card__thumb">
        {video.thumbnailUrl && (
          <img src={video.thumbnailUrl} alt={video.title} />
        )}
      </div>
      <div className="video-card__body">
        <h3 className="video-card__title">{video.title}</h3>
        <p className="video-card__channel">{video.channelTitle}</p>
        <button className="video-card__btn" type="button" onClick={handleAdd}>
          Add to playlist
        </button>
      </div>
    </div>
  );
}

export default VideoCard;

