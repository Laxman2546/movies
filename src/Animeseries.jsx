import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Animeseries = () => {
  const [animeLists, setAnimeLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;

  useEffect(() => {
    if (!movieApi) {
      setError("API key is missing. Please check your configuration.");
      console.error("API key is missing!");
      return;
    }

    const fetchAnime = async (page) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://nanimoviesapi.vercel.app/anime/${page}`
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
        setAnimeLists((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setError("Failed to load anime. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime(page);
  }, [movieApi, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <Navbar />
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-3 gap-1.5 ml-3 pt-2 mt-25">
        {animeLists.length > 0
          ? animeLists.map((anime, index) => (
              <div
                className="flex flex-col items-center cursor-pointer"
                key={index}
                onClick={() => {
                  const year = new Date(anime.release_date).getFullYear();
                  navigate(
                    `/player?animeId=${anime.id}&animename=${
                      anime.original_title
                    }&animeYear=${encodeURIComponent(
                      year
                    )}&poster=${encodeURIComponent(anime.poster_path)}
                    &movieoverview=${encodeURIComponent(
                      anime.overview
                    )}&release=${encodeURIComponent(year)}
                    `
                  );
                }}
              >
                <img
                  src={
                    anime.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${anime.poster_path}`
                      : "/placeholder-image.jpg"
                  }
                  alt={anime.original_title || "Unknown Anime"}
                  className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg"
                />
                <h1 className="font-medium lg:text-xl md:text-base sm:xsm">
                  {anime.original_title || "Unknown Anime"}
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
