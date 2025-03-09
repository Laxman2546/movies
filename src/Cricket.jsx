import React, { useState } from "react";
import Navbar from "./Navbar";
const Cricket = () => {
  const [cricStream, setcricStream] = useState("Server1");
  const [active, setActive] = useState("Server1");
  const servers = [
    "Server1",
    "Server2",
    "Server3",
    "tenSports",
    "skysports",
    "main",
  ];
  const handlePlayer = (name) => {
    setcricStream(name);
    setActive(name);
  };
  return (
    <div>
      <Navbar />
      <div className="frame w-full  mt-25 flex align-middle justify-center">
        <iframe
          src={
            cricStream === "Server1"
              ? "//stream.crichd.sc/update/star1hi.php"
              : cricStream === "Server2"
              ? "https://cdn.crichdplays.ru/embed2.php?id=willowextra"
              : cricStream === "Server3"
              ? "https://cdn.crichdplays.ru/embed2.php?id=willow"
              : cricStream === "tensports"
              ? "https://cdn.crichdplays.ru/embed2.php?id=tensp"
              : cricStream === "skysports"
              ? "https://cdn.crichdplays.ru/embed2.php?id=spch61"
              : cricStream === "main"
              ? "https://cdn.crichdplays.ru/embed2.php?id=ptvsp"
              : ""
          }
          width="100%"
          height="500px"
          marginheight="0"
          marginwidth="0"
          scrolling="no"
          frameborder="0"
          allowfullscreen=""
          allow="encrypted-media"
        ></iframe>
      </div>
      <div className="buttons w-full flex flex-wrap items-center justify-center gap-2.5">
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
  );
};

export default Cricket;
