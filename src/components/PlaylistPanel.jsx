import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";
import PlaylistItem from "./PlaylistItem.jsx";

function PlaylistPanel() {
  const { playlist, clearPlaylist, startPlaylist, currentIndex } = usePlaylist();

  const hasItems = playlist.length > 0;

  function handleClear() {
    const confirmed = window.confirm(
      "Clear all videos from the playlist?"
    );
    if (!confirmed) return;
    clearPlaylist();
  }

  return (
    <aside className="playlist">
      <div className="playlist__header">
        <h2 className="playlist__title">Current Playlist</h2>

        {hasItems && (
          <div className="playlist__header-actions">
            <button
              className="playlist__playall-btn"
              type="button"
              onClick={startPlaylist}
            >
              ▶ Play all
            </button>
            <button
              className="playlist__clear-btn"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        )}
      </div>


      {!hasItems ? (
        <p className="playlist__empty">
          No videos yet. Add videos from the search results.
        </p>
      ) : (
        <div className="playlist__items">
          {playlist.map((item, index) => (
            <PlaylistItem
              key={item.id}
              item={item}
              index={index}
              isActive={index === currentIndex}
            />
          ))}
        </div>
      )}
    </aside>
  );
}

export default PlaylistPanel;

