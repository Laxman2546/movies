import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Movieplayer = () => {
  const location = useLocation();
  const { movieName } = location.state;
  const { movieId } = location.state;
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
      <div className="main relative overflow-hidden pt-[56.25%] sm:pt-[75%] md:pt-[66.66%]">
        <iframe
          src={url}
          className="absolute top-0 left-0 w-full h-full"
          title="Movie Page"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Movieplayer;
