import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moviedetails from "./movieDetails";
import Navbar from "./navbar";

const Movieplayer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieName = searchParams.get("movieName");
  const poster = searchParams.get("poster");
  const movieoverview = searchParams.get("movieoverview");
  const movieId = searchParams.get("movieId");
  const release = searchParams.get("release");
  const seriesId = searchParams.get("seriesId");

  const url = movieId
    ? `https://vidsrc.xyz/embed/movie/${movieId}`
    : `https://vidsrc.icu/embed/tv/${seriesId}/1/1`;

  return (
    <>
      <Navbar />
      <div className="main relative overflow-hidden pt-[56.25%] sm:pt-[75%] md:pt-[66.66%]">
        <iframe
          src={`https://player4u.xyz/embed?key=${movieName}+${release}`}
          className="absolute top-0 left-0 w-full h-full"
          title="Movie Page"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
      {/* <iframe src={url} title="Movie Page" allowFullScreen></iframe> */}
      <Moviedetails
        moviedetails={{ movieName, movieoverview, poster, release }}
      />
    </>
  );
};

export default Movieplayer;
