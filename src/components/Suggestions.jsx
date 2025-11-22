import React, { useEffect, useState } from "react";
import { fetchRelatedVideos } from "../services/youtube.js";
import VideoCard from "./VideoCard.jsx";

function Suggestions({ currentVideoId }) {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentVideoId) {
      setSuggested([]);
      setError("");
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const results = await fetchRelatedVideos(currentVideoId);
        if (!cancelled) {
          setSuggested(results);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Could not load suggestions.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [currentVideoId]);

  if (!currentVideoId) {
    return null;
  }

  return (
    <section className="suggestions">
      <div className="suggestions__header">
        <h3 className="suggestions__title">Suggested next videos</h3>
        {loading && (
          <span className="suggestions__status">Updating…</span>
        )}
        {error && (
          <span className="suggestions__status suggestions__status--error">
            {error}
          </span>
        )}
      </div>

      {!loading && !error && suggested.length === 0 && (
        <p className="suggestions__empty">
          No suggestions found for this video.
        </p>
      )}

      {suggested.length > 0 && (
        <div className="suggestions__grid">
          {suggested.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Suggestions;


