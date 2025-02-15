import React from "react";

const Moviedetails = ({ moviedetails }) => {
  return (
    <>
      <div className="main p-15 w-full flex flex-row gap-5 md:p-10 sm:p-0">
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/w500${moviedetails.poster}`}
            width={200}
            height={200}
          />
        </div>
        <div className="moviemain">
          <div className="title ">
            <h1 className="lg:text-3xl md:text-2xl sm:text-lg text-nowrap font-bold">
              {moviedetails.movieName}
            </h1>
          </div>
          <div className="overview">
            <h1 className="lg:text-lg md:text-md sm:text-sm lg:w-150 md:w-100 sm:w-80 mt-2 font-bold">
              Overview:
            </h1>
            <p className="lg:text-lg md:text-md sm:text-sm lg:w-150 md:w-100 sm:w-80 mt-2">
              {moviedetails.movieoverview
                ? moviedetails.movieoverview
                : "No overview found"}
            </p>
            <h1 className="lg:text-lg md:text-md sm:text-sm lg:w-150 md:w-100 sm:w-80 mt-2 font-bold">
              Release date:
            </h1>
            <p className="lg:text-lg md:text-md sm:text-sm lg:w-150 md:w-100 sm:w-80 mt-2">
              {moviedetails.release
                ? moviedetails.release
                : "No Releasedate found"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moviedetails;
