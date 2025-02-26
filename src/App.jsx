import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Webseries from "./Webseries";
import Movieplayer from "./Movieplayer";
import Animeseries from "./Animeseries";
import AnimePlayer from "./AnimePlayer.jsx";
import Stopper from "./Stopper";
const App = () => {
  return (
    <>
      {/* <Stopper />; */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Movieplayer />} />
        <Route path="/animeplayer" element={<AnimePlayer />} />
        <Route path="/webseries" element={<Webseries />} />
        <Route path="/anime" element={<Animeseries />} />
      </Routes>
    </>
  );
};

export default App;
