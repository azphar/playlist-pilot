import React, { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import VideoGrid from "../components/VideoGrid.jsx";
import PlaylistPanel from "../components/PlaylistPanel.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import Suggestions from "../components/Suggestions.jsx";
import { searchYouTube } from "../services/youtube.js";
import { usePlaylist } from "../context/PlaylistContext.jsx";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentVideo } = usePlaylist();

  async function handleSearch(query) {
    try {
      setLoading(true);
      setError("");
      setVideos([]);

      const results = await searchYouTube(query);
      setVideos(results);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Something went wrong fetching videos. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home">
      <section className="home__left">
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="home__status home__status--loading">
            Searching YouTube…
          </p>
        )}

        {error && (
          <p className="home__status home__status--error">{error}</p>
        )}

        <VideoPlayer />

        <Suggestions currentVideoId={currentVideo?.id} />

        <VideoGrid videos={videos} />
      </section>

      <section className="home__right">
        <PlaylistPanel />
      </section>
    </main>
  );
}

export default Home;


