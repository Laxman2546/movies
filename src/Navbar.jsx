import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import sun from "./assets/sun.png";
import moon from "./assets/moon.png";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.backgroundColor = mode ? "#fff" : "#000";
    document.body.style.color = mode ? "#000" : "#fff";
  }, [mode]);

  const handleSearch = () => {
    if (search.trim()) {
      const searchType = location.pathname.includes("webseries")
        ? "webseries"
        : "";
      navigate(`/${searchType}?query=${search}`);
    }
  };
  const handleCross = () => {
    setSearch("");
    setIsSearch(false);
  };
  return (
    <nav className="p-5 flex justify-between items-center bg-gray-100 dark:bg-gray-900 sticky top-0 z-20">
      <h1 className="font-bold text-2xl text-gray-800 dark:text-white">
        NaniMovies
      </h1>

      <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Anime</Link>
        <Link to="/webseries">Webseries</Link>
      </div>

      <button
        className="md:hidden text-gray-700 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className="hidden md:flex items-center gap-3">
        <div className="input relative">
          <input
            type="text"
            className="p-2 border rounded-xl"
            placeholder={
              location.pathname.includes("webseries")
                ? "Search Webseries"
                : "Search Movie"
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsSearch(e.target.value.trim() !== "");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {isSearch ? (
            <X
              size={20}
              onClick={() => handleCross()}
              className="absolute top-2.5 right-2 cursor-pointer"
            />
          ) : (
            ""
          )}
        </div>
        <img
          src="https://img.icons8.com/ios-filled/50/search--v2.png"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSearch}
        />
        <img
          src={mode ? sun : moon}
          alt="modechange"
          width={20}
          height={20}
          className="cursor-pointer p-1 bg-blue-50 rounded-xl"
          onClick={() => setMode((prev) => !prev)}
        />
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-100 dark:bg-gray-900 md:hidden flex flex-col items-center py-5 gap-5 text-gray-800 dark:text-gray-300 z-50">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Trending
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Anime
          </Link>
          <Link to="/webseries" onClick={() => setIsOpen(false)}>
            Webseries
          </Link>

          <div className="flex items-center gap-3">
            <div className="input relative">
              <input
                type="text"
                className="p-2 border rounded-xl relative"
                placeholder={
                  location.pathname.includes("webseries")
                    ? "Search Webseries"
                    : "Search Movie"
                }
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearch(e.target.value.trim() !== "");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {isSearch ? (
                <X
                  size={28}
                  onClick={() => handleCross()}
                  className="absolute top-2 right-2  cursor-pointer"
                />
              ) : (
                ""
              )}
            </div>
            <img
              src="https://img.icons8.com/ios-filled/50/search--v2.png"
              width={20}
              height={20}
              className={`cursor-pointer ${
                !search.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSearch}
            />

            <img
              src={mode ? sun : moon}
              alt="modechange"
              width={20}
              height={20}
              className="cursor-pointer p-1 bg-blue-50 rounded-xl"
              onClick={() => setMode((prev) => !prev)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
