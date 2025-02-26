import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
const backendUrl = "http://localhost:5000";

const AnimePlayer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const animeId = searchParams.get("animeId");
  const animeNameFromURL = searchParams.get("animename");
  const [episodes, setEpisodes] = useState([]);
  const [animeName, setAnimeName] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!animeId) {
      console.error("Anime ID is missing");
      setError("Invalid anime ID");
      return;
    }

    let isMounted = true;

    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?with_genres=16&sort_by=popularity.desc&page=1`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${movieApi}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        if (isMounted) setAnimeName(data.name);
      } catch (err) {
        console.error("Failed to fetch anime details", err);
      }
    };

    const fetchEpisodes = async () => {
      try {
        console.log(`Fetching episodes for Anime ID: ${animeId}`);
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${animeId}/season/1?api_key=${movieApi}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        if (!data.episodes || data.episodes.length === 0) {
          setError("No episodes found");
          return;
        }
        if (isMounted) setEpisodes(data.episodes);
      } catch (err) {
        setError("Failed to load episodes");
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnimeDetails();
    fetchEpisodes();

    return () => {
      isMounted = false;
    };
  }, [animeId]);

  const fetchStreamLink = async (episode) => {
    try {
      setSelectedEpisode(episode.episode_number);

      const res = await fetch(
        `${backendUrl}/getTrid?anime=${encodeURIComponent(
          animeNameFromURL
        )}&episode=${episode.episode_number}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const { trid } = await res.json();
      if (!trid) throw new Error("No TRID received");

      console.log("TRID received:", trid);

      // Update the UI with the TRID (or use it for further requests)
      setEpisodes((prev) =>
        prev.map((ep) =>
          ep.episode_number === episode.episode_number
            ? { ...ep, streamUrl: `https://toonstream.co/embed/?trid=${trid}` }
            : ep
        )
      );
    } catch (error) {
      console.error("Error fetching TRID:", error);
    }
  };

  if (loading) return <p>Loading episodes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{animeName} Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <button onClick={() => fetchStreamLink(episode)}>
              {episode.name} (Episode {episode.episode_number})
            </button>
          </li>
        ))}
      </ul>

      {selectedEpisode &&
      episodes.find((ep) => ep.episode_number === selectedEpisode)
        ?.streamUrl ? (
        <iframe
          src={
            episodes.find((ep) => ep.episode_number === selectedEpisode)
              ?.streamUrl
          }
          width="560"
          height="315"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No streaming link available</p>
      )}
    </div>
  );
};

export default AnimePlayer;
