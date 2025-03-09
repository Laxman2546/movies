import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Webseries from "./Webseries";
import Movieplayer from "./Movieplayer";
import Animeseries from "./Animeseries";
import Trending from "./Trending.jsx";
import Stopper from "./Stopper";
import Cricket from "./Cricket.jsx";
const App = () => {
  return (
    <>
      <Stopper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Movieplayer />} />
        <Route path="/webseries" element={<Webseries />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/anime" element={<Animeseries />} />
        <Route path="/cricket" element={<Cricket />} />
      </Routes>
    </>
  );
};

export default App;
