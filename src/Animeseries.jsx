import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Animeseries = () => {
  const [animeLists, setAnimeLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;

  useEffect(() => {
    if (!movieApi) {
      setError("API key is missing. Please check your configuration.");
      console.error("API key is missing!");
      return;
    }

    const fetchAnime = async () => {
      setLoading(true);
      setError(null);

      try {
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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success === false || !data.results) {
          setError(data.status_message || "No anime found.");
          console.error("API Error:", data.status_message);
          return;
        }
        console.log(data);
        setAnimeLists(data.results);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setError("Failed to load anime. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [movieApi]);

  return (
    <>
      <Navbar />
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
        {animeLists.length > 0
          ? animeLists.map((anime) => (
              <div
                className="flex flex-col items-center cursor-pointer"
                key={anime.id}
                onClick={() =>
                  navigate(
                    `/animeplayer?animeId=${anime.id}&animename=${anime.name}&episode=${anime.episode}`
                  )
                }
              >
                <img
                  src={
                    anime.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${anime.poster_path}`
                      : "/placeholder-image.jpg"
                  } // Use a fallback image
                  alt={anime.name || "Unknown Anime"}
                  className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg"
                />
                <h1 className="lg:text-xl md:text-lg sm:text-sm font-medium text-center">
                  {anime.name || "Unknown Anime"}
                </h1>
              </div>
            ))
          : !loading && (
              <p className="text-center text-lg text-gray-500">
                No anime found.
              </p>
            )}
      </div>

      {loading && (
        <div className="text-center text-xl font-semibold mt-10">
          Loading...
        </div>
      )}
    </>
  );
};

export default Animeseries;
