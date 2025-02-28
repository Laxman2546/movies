import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import noposter from "./assets/noposter.jpg";
const Trending = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const pageNumber = 1;
  const url = `https://api.themoviedb.org/3/discover/movie?&with_genres=27&language=te&page=1`;

  const fetchHorror = async () => {
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${movieApi}`,
          Accept: "application/json",
        },
      });
      const response = await data.json();
      console.log(response.results);
      setResults(response.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHorror();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <div>
          {results.map((result, index) => (
            <div key={index}>
              <h1>{result.title || "unkowntitle"}</h1>
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : noposter
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
