const API_BASE = "https://www.googleapis.com/youtube/v3";

function mapItemToVideo(item) {
  return {
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl: item.snippet.thumbnails?.medium?.url,
  };
}

async function callYouTube(params) {
  const apiKey = import.meta.env.VITE_YT_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_YT_API_KEY in .env.local");
  }

  const searchParams = new URLSearchParams({
    key: apiKey,
    part: "snippet",
    ...params,
  });

  const url = `${API_BASE}/search?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    let details = "";
    try {
      const data = await response.json();
      details = data.error?.message || JSON.stringify(data);
    } catch {
      // ignore parse error
    }
    throw new Error(`YouTube API error ${response.status}: ${details}`);
  }

  const data = await response.json();
  return (data.items || []).map(mapItemToVideo);
}

export async function searchYouTube(query) {
  if (!query || !query.trim()) return [];

  return callYouTube({
    q: query,
    maxResults: "12",
    type: "video",
    safeSearch: "moderate",
  });
}

export async function fetchRelatedVideos(videoId) {
  if (!videoId) return [];

  return callYouTube({
    relatedToVideoId: videoId,
    maxResults: "8",
    type: "video",
    safeSearch: "moderate",
  });
}


