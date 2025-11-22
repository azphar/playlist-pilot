import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null); 

  function addToPlaylist(video) {
    setPlaylist((prev) => {
      const exists = prev.some((item) => item.id === video.id);
      if (exists) return prev;
      return [...prev, video];
    });
  }

  function removeFromPlaylist(videoId) {
    setPlaylist((prev) => {
      const next = prev.filter((item) => item.id !== videoId);

  
      if (currentIndex === null) return next;

      const removedIndex = prev.findIndex((item) => item.id === videoId);

      if (removedIndex === -1) return next;

      if (next.length === 0) {
        setCurrentIndex(null);
      } else if (removedIndex < currentIndex) {
        setCurrentIndex((idx) => Math.max(0, idx - 1));
      } else if (removedIndex === currentIndex) {
        // stay on same position if possible
        setCurrentIndex((idx) =>
          idx >= next.length ? next.length - 1 : idx
        );
      }

      return next;
    });
  }

  function clearPlaylist() {
    setPlaylist([]);
    setCurrentIndex(null);
  }

  // --- Player controls ---

  function startPlaylist() {
    if (playlist.length === 0) return;
    setCurrentIndex(0);
  }

  function playFromIndex(index) {
    if (index < 0 || index >= playlist.length) return;
    setCurrentIndex(index);
  }

  function playNext() {
    if (currentIndex === null) return;
    if (currentIndex + 1 >= playlist.length) return;
    setCurrentIndex((idx) => idx + 1);
  }

  function playPrev() {
    if (currentIndex === null) return;
    if (currentIndex === 0) return;
    setCurrentIndex((idx) => idx - 1);
  }

  const currentVideo =
    currentIndex !== null && playlist[currentIndex]
      ? playlist[currentIndex]
      : null;

  const value = {
    playlist,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    // player
    currentIndex,
    currentVideo,
    startPlaylist,
    playFromIndex,
    playNext,
    playPrev,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}

