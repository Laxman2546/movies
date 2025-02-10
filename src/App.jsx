import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [names, setnames] = useState([]);
  const [link, setlink] = useState("");
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const movieData = async () => {
    const response = await fetch(
      " https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=te-IN&page=1&sort_by=popularity.desc",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${movieApi}`,
          Accept: " application/json",
        },
      }
    );
    const moviesLists = await response.json();
    return movieMania(moviesLists);
  };

  const movieMania = (moviesLists) => {
    const movieNames = moviesLists.results.map((result) => ({
      name: result.name || result.title,
      poster: result.poster_path,
      id: result.id,
    }));
    setnames(movieNames);
  };

  useEffect(() => {
    movieData();
  }, [movieApi]);

  const redirect = (movie) => {
    console.log(movie.id);
    const id = movie.id;
    const videoApi = `https://vidsrc.icu/embed/movie/${id}`;
  };

  return (
    <div className="w-full h-screen mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center">
      {names.map((movie, index) => (
        <div key={index} className="mt-2.5 ">
          <div
            className="flex flex-col items-center select-none cursor-pointer"
            onClick={() => redirect(movie)}
          >
            <img
              width={250}
              height={250}
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt="moviePoster"
            />
            <h4 className="font-medium text-xl">{movie.name}</h4>
            <h2>{movie.id}</h2>
            <a
              href={`https://vidsrc.icu/embed/movie/${movie.id}`}
              target="_blank"
            >
              play
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
