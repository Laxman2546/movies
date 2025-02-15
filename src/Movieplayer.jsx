import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moviedetails from "./movieDetails";
import Navbar from "./navbar";

const Movieplayer = () => {
  const location = useLocation();
  const { movieName, poster, movieoverview, movieId, release } = location.state;
  console.log(poster);
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === "A" || event.target.closest("a")) {
        event.preventDefault();
        console.log("Link click blocked!");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  window.open = function () {
    console.log("Blocked an attempt to open a new window.");
    return null;
  };
  const url = `https://vidsrc.xyz/embed/movie/${movieId}`;
  return (
    <>
      <Navbar />
      <div className="main relative overflow-hidden pt-[56.25%] sm:pt-[75%] md:pt-[66.66%]">
        <iframe
          src={url}
          className="absolute top-0 left-0 w-full h-full"
          title="Movie Page"
          allowFullScreen
        ></iframe>
      </div>
      <Moviedetails
        moviedetails={{ movieName, movieoverview, poster, release }}
      />
    </>
  );
};

export default Movieplayer;
