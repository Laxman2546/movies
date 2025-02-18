import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

const Webseries = () => {
  const [webnames, setwebnames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=True&include_null_first_air_dates=false&with_original_language=en&page=${page}&sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${movieApi}`,
      accept: "application/json",
    },
  };
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setwebnames((prev) => [...prev, ...json.results]);
        setLoading(false);
        console.log(json.results);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
      <div className="webseriesList grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-1.5 ml-3 pt-2">
        {webnames.map((webname, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={
                webname.poster_path
                  ? `https://image.tmdb.org/t/p/w500${webname.poster_path}`
                  : `https://placehold.co/600x850.png`
              }
              alt="Webseries poster"
              className="w-[250px]"
              onClick={() => {
                const url = `/player?seriesId=${webname.id}`;
                window.open(url, "_blank");
              }}
            />
            <h1 className="lg:text-xl md:text-lg sm:text-sm font-medium">
              {webname.name}
            </h1>
            <h1 className="lg:text-xl md:text-lg sm:text-sm font-medium">
              {webname.id}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Webseries;
