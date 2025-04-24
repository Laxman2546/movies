import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import noposter from "./assets/noposter.jpg";
import loader from "./assets/loader.gif";
const Home = () => {
  const [names, setNames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recentMovie, setRecentMovie] = useState();
  const [updateRecent, setUpdateRecent] = useState(false);
  const [hoveredMovieIndex, setHoveredMovieIndex] = useState(null);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const fetchMovies = async (pageNumber, isSearch = false) => {
    if (loading) return;
    setLoading(true);
    const isTV = false;
    const url = query
      ? `https://nanimoviesapi.vercel.app/search/movie/${query}/${pageNumber}`
      : `https://nanimoviesapi.vercel.app/movies/${pageNumber}`;

    try {
      const response = await fetch(url);
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

  const storageFun = (movieName, movieoverview, poster, year, id) => {
    const newMovie = {
      title: movieName,
      overview: movieoverview,
      poster: poster,
      year: year,
      id: id,
    };
    let existingRecent = JSON.parse(localStorage.getItem("movieData"));
    if (!Array.isArray(existingRecent)) {
      existingRecent = [];
    }
    const filtered = existingRecent.filter((m) => m.title !== newMovie.title);
    const updated = [newMovie, ...filtered];
    const limitMovie = updated.slice(0, 5);
    localStorage.setItem("movieData", JSON.stringify(limitMovie));
    setUpdateRecent((prev) => !prev);
  };
  const fetchRecent = () => {
    const data = localStorage.getItem("movieData");
    const MovieRecent = JSON.parse(data);
    setRecentMovie(MovieRecent);
  };
  useEffect(() => {
    fetchRecent();
  }, [updateRecent]);
  const handlePlayer = (movieName, movieoverview, poster, year, id) => {
    const url = `/player?movieId=${id}&movieName=${encodeURIComponent(
      movieName
    )}&movieoverview=${encodeURIComponent(
      movieoverview
    )}&poster=${poster}&release=${year}`;
    window.open(url, "_blank");
  };
  const removeMovie = (movieName) => {
    let existingRecent = JSON.parse(localStorage.getItem("movieData"));
    if (!Array.isArray(existingRecent)) return;
    const updated = existingRecent.filter((m) => m.title !== movieName);
    localStorage.setItem("movieData", JSON.stringify(updated));
    setUpdateRecent((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      {loading && names.length === 0 ? (
        <div className="w-full flex items-center justify-center mt-25">
          <img src={loader} className="w-[150px] h-[150px]" />
        </div>
      ) : query && names.length === 0 ? (
        <div className="text-center text-xl font-semibold mt-25">
          No results found for "{query}" 😕
        </div>
      ) : (
        <div className="w-full flex flex-col">
          {recentMovie && recentMovie.length > 0 && !query && (
            <div className="w-full pt-[150px]">
              <h1 className="w-full pl-[50px] text-2xl font-extrabold">
                Recently Watched
              </h1>
              <div className="w-full mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-3 gap-4 ">
                {recentMovie.map((movie, index) => (
                  <div key={index} className="mt-2.5">
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => {
                        const movieName = movie.name || movie.title;
                        const movieoverview = movie.overview;
                        const poster = movie.poster;
                        const id = movie.id;
                        const year = movie.year;
                        handlePlayer(
                          movieName,
                          movieoverview,
                          poster,
                          year,
                          id
                        );
                      }}
                      onMouseEnter={() => setHoveredMovieIndex(index)}
                      onMouseLeave={() => setHoveredMovieIndex(null)}
                    >
                      <div className="relative">
                        <img
                          src={
                            movie.poster
                              ? `https://image.tmdb.org/t/p/w500${movie.poster}`
                              : noposter
                          }
                          alt={movie.name || movie.title}
                          className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg"
                        />

                        {hoveredMovieIndex === index && (
                          <div
                            className=" absolute bottom-0  text-center p-2 w-full bg-red-600 text-white"
                            onClick={(e) => {
                              const movieName = movie.name || movie.title;
                              e.stopPropagation();
                              removeMovie(movieName);
                            }}
                          >
                            Delete movie
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium lg:text-xl md:text-lg sm:text-base">
                        {movie.name || movie.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full mt-25 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-3 gap-4 ">
            {names.map((movie, index) => (
              <div key={index} className="mt-2.5">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    const year = new Date(movie.release_date).getFullYear();
                    const movieName = movie.name || movie.title;
                    const movieoverview = movie.overview;
                    const poster = movie.poster_path;
                    const id = movie.id;
                    handlePlayer(movieName, movieoverview, poster, year, id);
                    storageFun(movieName, movieoverview, poster, year, id);
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
                  <h4 className="font-medium lg:text-xl md:text-lg sm:text-base">
                    {movie.name || movie.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
