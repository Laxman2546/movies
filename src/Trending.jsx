import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import noposter from "./assets/noposter.jpg";

const Trending = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;

  const fetchHorror = async (pagenumber) => {
    if (loading) return;
    setLoading(true);

    const url = `https://api.themoviedb.org/3/discover/movie?&with_genres=27&page=${pagenumber}`;
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${movieApi}`,
          Accept: "application/json",
        },
      });
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-1.5 ml-3 pt-2">
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
            <h1 className="lg:text-xl md:text-lg sm:text-sm font-medium">
              {result.title || "unkowntitle"}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Trending;
