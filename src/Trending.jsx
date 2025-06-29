import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import noposter from "./assets/noposter.jpg";
import Sliding from "./Sliding";

const Trending = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;

  const fetchHorror = async (pagenumber) => {
    if (loading) return;
    setLoading(true);

    const url = `https://nanimoviesapi.vercel.app/horror/${pagenumber}`;
    try {
      const data = await fetch(url);
      const response = await data.json();
      setResults((prev) => [...prev, ...response.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorror(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
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
      {/* <Sliding /> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-3 gap-1.5 ml-3 pt-2 mt-25">
        {results.map((result, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                  : noposter
              }
              className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg"
              alt={result.title || "unkowntitle"}
              onClick={() => {
                const year = new Date(result.release_date).getFullYear();
                const url = `/player?seriesId=${
                  result.id
                }&seriesname=${encodeURIComponent(
                  result.title
                )}&seriesyear=${encodeURIComponent(
                  year
                )}&poster=${encodeURIComponent(result.poster_path)}
                &seriesoverview=${encodeURIComponent(result.overview)}`;
                window.open(url, "_blank");
              }}
            />
            <h1 className="font-medium lg:text-xl md:text-lg sm:text-base">
              {result.title || "unkowntitle"}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Trending;
