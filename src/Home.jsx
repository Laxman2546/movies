import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [names, setNames] = useState([]);
  const [page, setPage] = useState(1);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;

  const movieData = async (pageNumber) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_original_language=te&page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${movieApi}`,
          Accept: "application/json",
        },
      }
    );
    const moviesLists = await response.json();
    setNames((prev) => [
      ...prev,
      ...moviesLists.results.map((result) => ({
        name: result.name || result.title,
        poster: result.poster_path,
        id: result.id,
      })),
    ]);
  };

  useEffect(() => {
    movieData(page);
  }, [movieApi, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const bottomVisible = () =>
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight ||
      document.documentElement.clientHeight);

  useEffect(() => {
    const handleScroll = () => {
      if (bottomVisible()) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="w-full mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {names.map((movie, index) => (
          <div key={index} className="mt-2.5">
            <Link
              to="/player"
              state={{ movieId: movie.id, movieName: movie.name }}
            >
              <div className="flex flex-col items-center cursor-pointer">
                <img
                  width={250}
                  height={250}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                  alt="moviePoster"
                />
                <h4 className="font-medium text-xl">{movie.name}</h4>
                <h4 className="font-medium text-xl">{movie.id}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
