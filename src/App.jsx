import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Webseries from "./Webseries";
import Movieplayer from "./Movieplayer";
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
