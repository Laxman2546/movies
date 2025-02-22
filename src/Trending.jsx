import React from "react";
import Credits from "./credits";

const Trending = () => {
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=te-IN&with_original_language=te`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${movieApi}`,
      accept: "application/json",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
  return (
    <>
      <Credits />
    </>
  );
};

export default Trending;
