import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Webseries from "./Webseries";
import Movieplayer from "./Movieplayer";
import Animeseries from "./Animeseries";
import Trending from "./Trending.jsx";
import Stopper from "./Stopper";
import Cricket from "./Cricket.jsx";
import Download from "./Download.jsx";
import curtainVideo from "../src/assets/curtain.mp4";
import { useEffect, useState } from "react";
import DownloadPlayer from "./downloadPlayer.jsx";

const App = () => {
  const [curtain, setCurtain] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtain(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {curtain ? (
        <video
          src={curtainVideo}
          className="w-full h-screen object-fill"
          autoPlay
          muted
          playsInline
        ></video>
      ) : (
        <>
          <Stopper />
          <Routes>
            <Route path="/" element={<Download />} />
            <Route path="/player" element={<Movieplayer />} />
            <Route path="/downloadplayer" element={<DownloadPlayer />} />
            <Route path="/webseries" element={<Webseries />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/anime" element={<Animeseries />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/download" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
