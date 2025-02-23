import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moviedetails from "./Moviedetails";
import Navbar from "./Navbar";

const Movieplayer = () => {
  const [player, setPlayer] = useState("Server1");
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Server1");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieName = searchParams.get("movieName");
  const poster = searchParams.get("poster");
  const movieoverview = searchParams.get("movieoverview");
  const movieId = searchParams.get("movieId");
  const release = searchParams.get("release");
  const seriesId = searchParams.get("seriesId");
  const seriesname = searchParams.get("seriesname");
  const seriesyear = searchParams.get("seriesyear");
  const seriesoverview = searchParams.get("seriesoverview");

  const handlePlayer = (playerName) => {
    setLoading(true);
    setPlayer(playerName); 
    setActive(playerName); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [player]);

  const servers = ["Server1", "Server2(MULTI-LANG)"];

  return (
    <>
      <Navbar />

      <div className="main relative overflow-hidden pt-[56.25%] sm:pt-[75%] md:pt-[66.66%] flex justify-center items-center">
        {loading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : (
          <iframe
            src={
              player === "Server1"
                ? `https://vidsrc.xyz/embed/movie/${movieId}`
                : player === "Server2(MULTI-LANG)"
                ? `https://player4u.xyz/embed?key=${movieName || seriesname}+${
                    release || seriesyear
                  }`
                : ""
            }
            className="absolute top-0 left-0 w-full h-full"
            title="Movie Player"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="servers w-full p-5">
        <h1 className="font-bold text-lg">
          If the movie is not found, try another server:
        </h1>
        <div className="serverBtns">
          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => handlePlayer(server)}
              className={`p-2 rounded m-2 transition-all cursor-pointer ${
                active === server
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {server.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <Moviedetails
        moviedetails={{
          movieId,
          movieName,
          movieoverview,
          poster,
          release,
          seriesId,
          seriesname,
          seriesyear,
          seriesoverview,
        }}
      />
    </>
  );
};

export default Movieplayer;
