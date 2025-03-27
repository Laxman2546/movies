import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import noposter from "./assets/noposter.jpg";

const Webseries = () => {
  const [webnames, setWebnames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const fetchWebseries = async (pageNumber, isSearch = false) => {
    if (loading) return;
    setLoading(true);

    const isTV = true;
    const url = query
      ? `https://nanimoviesapi.vercel.app/search/tv/${query}/${pageNumber}`
      : `https://nanimoviesapi.vercel.app/webseries/${pageNumber}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setWebnames((prev) =>
        isSearch ? data.results : [...prev, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return (
        <>
          <p>something went wrong</p>
        </>
      );
    }

    setLoading(false);
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
      {loading && webnames.length === 0 ? (
        <div className="text-center text-xl font-semibold mt-25">
          Loading...
        </div>
      ) : webnames.length === 0 ? (
        <div className="text-center text-xl font-semibold mt-25">
          Is "{query}" a Webseries check the spell again! 😕
        </div>
      ) : (
        <div className="webseriesList grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-3 gap-1.5 ml-3 pt-2 mt-25">
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
                className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg"
                onClick={() => {
                  const year = new Date(webname.first_air_date).getFullYear();
                  const url = `/player?seriesId=${
                    webname.id
                  }&seriesname=${encodeURIComponent(
                    webname.name
                  )}&seriesyear=${encodeURIComponent(
                    year
                  )}&poster=${encodeURIComponent(webname.poster_path)}
                &seriesoverview=${encodeURIComponent(webname.overview)}`;
                  window.open(url, "_blank");
                }}
              />
              <h1 className="font-medium lg:text-xl md:text-lg sm:text-base">
                {webname.name}
              </h1>
            </div>
          ))}
        </div>
      )}

      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
    </>
  );
};

export default Webseries;
