import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movieplayer from "./moviePlayer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Movieplayer />} />
      </Routes>
    </>
  );
};

export default App;
