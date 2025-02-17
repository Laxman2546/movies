import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./navbar";

const Home = () => {
  const [names, setNames] = useState([]);
  const [page, setPage] = useState(1);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const fetchMovies = async (pageNumber, isSearch = false) => {
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_original_language=te&page=${pageNumber}&sort_by=popularity.desc`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${movieApi}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    setNames((prev) => (isSearch ? data.results : [...prev, ...data.results]));
  };

  useEffect(() => {
    setNames([]);
    fetchMovies(1, true);
  }, [query]);
  useEffect(() => {
    if (!query) fetchMovies(page);
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full mt-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4">
        {names.map((movie, index) => (
          <div key={index} className="mt-2.5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                const url = `/player?movieId=${
                  movie.id
                }&movieName=${encodeURIComponent(
                  movie.name || movie.title
                )}&movieoverview=${encodeURIComponent(movie.overview)}&poster=${
                  movie.poster_path
                }&release=${movie.release_date}`;

                window.open(url, "_blank");
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "fallback-image-url"
                }
                alt={movie.name || movie.title}
              />
              <h4 className="font-medium text-xl">{movie.name || movie.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
