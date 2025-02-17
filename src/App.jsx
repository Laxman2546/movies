import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movieplayer from "./moviePlayer";
import Webseries from "./Webseries";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Movieplayer />} />
        <Route path="/webseries" element={<Webseries />} />
      </Routes>
    </>
  );
};

export default App;
