import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

function VideoPlayer() {
  const { currentVideo, currentIndex, playlist, playNext, playPrev } =
    usePlaylist();

  if (!currentVideo) {
    return null; // nothing selected yet
  }

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < playlist.length - 1;

  const embedUrl = `https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`;

  return (
    <section className="player">
      <div className="player__frame-wrapper">
        <iframe
          className="player__frame"
          src={embedUrl}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="player__info">
        <div className="player__meta">
          <div className="player__now-playing-label">Now playing</div>
          <div className="player__title">{currentVideo.title}</div>
          <div className="player__channel">{currentVideo.channelTitle}</div>
        </div>

        <div className="player__controls">
          <button
            type="button"
            className="player__btn"
            onClick={playPrev}
            disabled={!hasPrev}
          >
            ◀ Previous
          </button>
          <button
            type="button"
            className="player__btn"
            onClick={playNext}
            disabled={!hasNext}
          >
            Next ▶
          </button>
        </div>
      </div>
    </section>
  );
}

export default VideoPlayer;
