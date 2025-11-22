import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

function PlaylistItem({ item, index, isActive }) {
  const { removeFromPlaylist, playFromIndex } = usePlaylist();

  function handleRemove(e) {
    e.stopPropagation(); // don’t trigger play when clicking X
    removeFromPlaylist(item.id);
  }

  function handlePlay() {
    playFromIndex(index);
  }

  return (
    <div
      className={`playlist-item${isActive ? " playlist-item--active" : ""}`}
      onClick={handlePlay}
    >
      <div className="playlist-item__index">{index + 1}</div>

      <div className="playlist-item__info">
        <div className="playlist-item__title">{item.title}</div>
        <div className="playlist-item__channel">{item.channelTitle}</div>
      </div>

      <button
        className="playlist-item__remove"
        type="button"
        onClick={handleRemove}
      >
        ×
      </button>
    </div>
  );
}

export default PlaylistItem;

