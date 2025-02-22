import React, { useEffect, useState } from "react";
import Credits from "./credits";

const Moviedetails = ({ moviedetails }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movieId = moviedetails.movieId;
  const seriesId = moviedetails.seriesId;
  useEffect(() => {
    if (movieId || seriesId) setSelectedMovie(movieId || seriesId);
  }, [movieId, seriesId]);

  return (
    <div className="main p-5 w-full md:p-10 sm:p-0 ">
      <div className="posterdet flex flex-col md:flex-row gap-5">
        <div className="image w-full md:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${moviedetails.poster}`}
            className="w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] h-[220px] sm:h-[250px] md:h-[300px] object-cover rounded-lg"
            alt="Movie Poster"
          />
        </div>
        <div className="moviedets ">
          <div className="moviemain flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">
              {moviedetails.movieName || moviedetails.seriesname}
            </h1>
            <div className="overview mt-2">
              <h2 className="text-lg font-bold">Overview:</h2>
              <p className="text-sm md:text-md mt-1">
                {moviedetails.movieoverview || moviedetails.seriesoverview
                  ? moviedetails.movieoverview || moviedetails.seriesoverview
                  : "No overview found"}
              </p>
            </div>
            <div className="release mt-2">
              <h2 className="text-lg font-bold">Release Date:</h2>
              <p className="text-sm md:text-md mt-1">
                {moviedetails.release || moviedetails.seriesyear
                  ? moviedetails.release || moviedetails.seriesyear
                  : "No Release date found"}
              </p>
            </div>
          </div>
          {selectedMovie && <Credits id={selectedMovie} className="hidden" />}
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;
