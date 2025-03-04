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
  const animeId = searchParams.get("animeId");
  const animename = searchParams.get("animename");
  const animeYear = searchParams.get("animeYear");
  const horrorId = searchParams.get("horrorId");
  const horrorname = searchParams.get("horrorname");
  const horroryear = searchParams.get("horroryear");

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

  const servers = ["Server1", "Server2(MULTI-LANG)", "Server3"];

  return (
    <>
      <Navbar />

      {/* Iframe Player */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
        ) : (
          <iframe
            allow="autoplay; fullscreen; encrypted-media"
            referrerPolicy="origin"
            loading="lazy"
            src={
              player === "Server1"
                ? `https://vidsrc.xyz/embed/movie/${
                    movieId || seriesId || animeId || horrorId
                  }`
                : player === "Server2(MULTI-LANG)"
                ? `https://player4u.xyz/embed?key=${
                    movieName || seriesname || animename || horrorname
                  }+${release || seriesyear || animeYear || horroryear}`
                : player === "Server3"
                ? `https://player4u.xyz/embed?key=${
                    movieName || seriesname || animename || horrorname
                  }+(${release || seriesyear || animeYear || horroryear})`
                : ""
            }
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              objectFit: "cover",
              aspectRatio: "16 / 9",
            }}
            title="Movie Player"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div style={{ width: "100%", padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          If the movie is not found, try another server:
        </h1>
        <div>
          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => handlePlayer(server)}
              style={{
                padding: "10px",
                margin: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: active === server ? "#22C55E" : "#3B82F6",
                color: "#FFFFFF",
                fontSize: "1rem",
              }}
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
          animeId,
        }}
      />
    </>
  );
};

export default Movieplayer;
