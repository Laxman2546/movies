import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movieplayer from "Movieplayer";
import Webseries from "./Webseries";
import Trending from "./trending";
import Movieplayer from "./moviePlayer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Movieplayer />} />
        <Route path="/webseries" element={<Webseries />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </>
  );
};

export default App;
