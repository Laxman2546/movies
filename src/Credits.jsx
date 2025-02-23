import React, { useEffect, useState } from "react";
import noposter from "./assets/noposter.jpg";
const Credits = ({ id }) => {
  const [castDatas, setcastDatas] = useState([]);
  useEffect(() => {
    const fetchMovieCast = async () => {
      if (!id) return;
      const movieApi = import.meta.env.VITE_APP_MOVIE_ACCESS_KEY;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${movieApi}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setcastDatas(data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchMovieCast();
  }, [id]);

  return (
    <>
      <div className="castDetails w-full max-w-4xl  mt-4   ">
        <h1 className="text-lg font-bold  mb-2">Cast:</h1>
        <div
          className="castimg w-full flex flex-nowrap gap-4 overflow-x-auto scroll-smooth touch-pan-x pb-2 p-5 select-none rounded-lg"
          style={{
            WebkitOverflowScrolling: "touch",
            minWidth: "100%",
          }}
        >
          {castDatas.map((castData, index) => (
            <div
              className="dets flex flex-col items-center min-w-[120px] max-w-[150px]"
              key={index}
            >
              <img
                src={
                  castData.profile_path
                    ? `https://image.tmdb.org/t/p/w500${castData.profile_path}`
                    : noposter
                }
                alt={castData.name}
                className={`w-[100px] sm:w-[120px] md:w-[150px] rounded-lg shadow-md ${
                  castData.profile_path
                    ? "h-auto"
                    : "h-[150px] sm:h-[180px] md:h-[200px]"
                }`}
              />

              <div className="names text-center mt-2">
                <h1 className=" text-sm font-medium">{castData.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Credits;
