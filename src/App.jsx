import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Webseries from "./Webseries";
import Movieplayer from "./Movieplayer";
import Animeseries from "./Animeseries";
import Trending from "./Trending.jsx";
import Stopper from "./Stopper";
const App = () => {
  return (
    <>
      <Stopper />;
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Movieplayer />} />
          <Route path="/webseries" element={<Webseries />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/anime" element={<Animeseries />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
