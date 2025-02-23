import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Webseries from "./Webseries";
import Movieplayer from "./Movieplayer";
import Stopper from "./Stopper";
const App = () => {
  return (
    <>
      <Stopper />;
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Movieplayer />} />
        <Route path="/webseries" element={<Webseries />} />
      </Routes>
    </>
  );
};

export default App;
