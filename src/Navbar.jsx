import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchBtn from "./assets/search.png";
import sun from "./assets/sun.png";
import moon from "./assets/moon.png";
const Navbar = () => {
  const [search, setsearch] = useState("");
  const [mode, setMode] = useState(false);
  let switchMode = () => {
    setMode(!mode);
  };
  const body = document.querySelector("body");
  if (mode === true) {
    body.style.backgroundColor = "#000";
    body.style.color = "#fff";
  } else {
    body.style.backgroundColor = "#fff";
    body.style.color = "#000";
  }

  return (
    <>
      <div className="navMain flex flex-row p-5 justify-between">
        <div className="heading">
          <h1 className=" font-bold text-2xl">NaniMovies</h1>
        </div>
        <div className="navLinks lg:flex  md:flex sm:hidden  flex-row gap-8 mt-0.5">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Trending</Link>
          <Link to={"/"}>Anime</Link>
          <Link to={"/"}>Webseries</Link>
        </div>
        <div className="search relative">
          <input
            type="text"
            className="pl-5 mr-8  p-2 border-1 rounded-2xl"
            placeholder="Seacrh Movie"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <div className="seaMode">
            <div className="search absolute bottom-3.5 right-10 cursor-pointer">
              <img
                src="https://img.icons8.com/ios-filled/50/search--v2.png"
                width={15}
                height={15}
                className="search"
              />
            </div>
          </div>
          <div className="mode absolute right-0 bottom-3.5">
            <img
              src={mode ? sun : moon}
              alt="modechange"
              width={20}
              height={20}
              className="sun"
              onClick={switchMode}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
