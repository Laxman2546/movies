import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import noposter from "./assets/noposter.jpg";
import loader from "./assets/loader.gif";
import { useLocation } from "react-router-dom";

const Download = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  // Add hasMore state to track if there's more data to load
  const [hasMore, setHasMore] = useState(true);

  const movieFetch = async (pageNumber) => {
    if (loading || (query && pageNumber > 1)) return; // Don't fetch more pages for search results

    setLoading(true);
    try {
      const url = query
        ? `https://movierulz.vercel.app/search?query=${query}`
        : `https://movierulz.vercel.app/telugu/${pageNumber}`;

      const data = await fetch(url);
      const response = await data.json();

      if (response.data && response.data.length > 0) {
        setMovieData((prev) =>
          pageNumber === 1 ? response.data : [...prev, ...response.data]
        );
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setMovieData([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    movieFetch(page);
  }, [page, query]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50 &&
        !loading &&
        hasMore &&
        !query
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, query]);

  const handleDownload = (url) => {
    const DownloadUrl = `/downloadplayer?url=${url}`;
    window.open(DownloadUrl);
  };

  return (
    <>
      <Navbar />
      {movieData.length === 0 && !loading ? (
        <div className="w-full text-center mt-25">
          <h2 className="font-medium lg:text-xl md:text-lg text-sm mt-2 break-words px-2 text-wrap line-clamp-2">
            This page is in development try agin later! 😉
          </h2>
          
        </div>
      ) : (
        <div className="w-full mt-25 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-3 gap-4">
          {movieData.map((movie, index) => (
            <div
              key={`${movie.link}-${index}`}
              className="mt-2.5 text-center w-full max-w-[200px] mx-auto cursor-pointer"
              onClick={() => {
                const url = movie.link;
                handleDownload(url);
              }}
            >
              <img
                src={movie.image ? movie.image : noposter}
                alt={movie.name || movie.title}
                className="w-[150px] sm:w-[120px] md:w-[200px] h-auto rounded-lg mx-auto"
              />
              <h4 className="font-medium lg:text-xl md:text-lg text-sm mt-2 break-words px-2 text-wrap line-clamp-2">
                {movie.name || movie.title}
              </h4>
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="w-full flex items-center justify-center my-4">
          <img src={loader} className="w-[150px] h-[150px]" alt="Loading..." />
        </div>
      )}
      {!hasMore && !loading && movieData.length > 0 && !query && (
        <div className="w-full text-center py-6">
          <p>No more movies to load</p>
        </div>
      )}
    </>
  );
};

export default Download;
