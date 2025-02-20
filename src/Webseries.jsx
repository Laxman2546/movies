import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import noposter from "./assets/noposter.jpg";

const Webseries = () => {
  const [webnames, setWebnames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const fetchWebseries = async (pageNumber, isSearch = false) => {
    const isTV = true;
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
      setWebnames((prev) =>
        isSearch ? data.results : [...prev, ...data.results]
      );
      setLoading(false);
      handleScroll();
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setWebnames([]);
    fetchWebseries(1, true);
  }, [query]);

  useEffect(() => {
    if (!query) {
      fetchWebseries(page);
    }
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
                  : noposter
              }
              alt={webname.name}
              className="w-[250px] h-[300px]"
              onClick={() => {
                const url = `/player?seriesId=${webname.id}`;
                window.open(url, "_blank");
              }}
            />
            <h1 className="lg:text-xl md:text-lg sm:text-sm font-medium">
              {webname.name}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Webseries;
