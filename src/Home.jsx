import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import noposter from "./assets/noposter.jpg";

const Home = () => {
  const [names, setNames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const fetchMovies = async (pageNumber, isSearch = false) => {
    if (loading) return;
    setLoading(true);

    const isTV = false;
    const url = query
      ? `https://api.themoviedb.org/3/search/${
          isTV ? "tv" : "movie"
        }?query=${query}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/discover/${
          isTV ? "tv" : "movie"
        }?include_adult=false&with_original_language=te&page=${pageNumber}&sort_by=popularity.desc`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${movieApi}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      setNames((prev) =>
        pageNumber === 1 ? data.results : [...prev, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNames([]);
    setPage(1);
    fetchMovies(1, true);
  }, [query]);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50 &&
        !loading
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
      <div className="w-full mt-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4">
        {names.map((movie, index) => (
          <div key={index} className="mt-2.5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                const year = new Date(movie.release_date).getFullYear();
                const url = `/player?movieId=${
                  movie.id
                }&movieName=${encodeURIComponent(
                  movie.name || movie.title
                )}&movieoverview=${encodeURIComponent(movie.overview)}&poster=${
                  movie.poster_path
                }&release=${year}`;
                window.open(url, "_blank");
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noposter
                }
                alt={movie.name || movie.title}
                className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg"
              />
              <h4 className="font-medium text-xl">
                {movie.name || movie.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
