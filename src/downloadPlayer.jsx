import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import loader from "./assets/loader.gif";
import noposter from "./assets/noposter.jpg";
import Navbar from "./Navbar";
import IframeComp from "./components/IframeComp";

const DownloadPlayer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [streamUrl, setStreamUrl] = useState();
  const url = searchParams.get("url");
  const DownloadUrl = `https://mamasapi.vercel.app/get?url=${url}`;

  const fetchData = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const data = await fetch(DownloadUrl);
      const response = await data.json();
      setMovieData(response);
      console.log(response);

      const streamwishLink = response.other_links.find(
        (link) => link.type === " Streamwish" && link.url
      );
      const streamLareLink = response.other_links.find(
        (link) => link.type === " Streamlare" && link.url
      );
      console.log(streamwishLink);
      const url = new URL(streamwishLink.url);
      const pathname = url.pathname;
      const frameUrl = pathname.split("/").pop();
      console.log(frameUrl);
      setStreamUrl(frameUrl);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="w-full flex items-center justify-center mt-20">
          <img src={loader} className="w-[100px] h-[100px]" />
        </div>
      ) : (
        <div className="w-full h-full mt-25 flex flex-col items-center px-4">
          <div className="flex flex-col items-center gap-6 max-w-[800px] w-full">
            <img
              src={movieData.image ? movieData.image : noposter}
              alt={movieData.title || "Poster"}
              className="w-[160px] md:w-[220px] h-auto rounded-lg shadow-md"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-center text-black">
              {movieData.title ? movieData.title : "No title found"}
            </h1>

            <div className="bg-white text-black p-4 rounded-md w-full shadow-md">
              <h2 className="text-lg font-bold mb-1">Overview:</h2>
              <p className="text-sm md:text-base">
                {movieData.description
                  ? movieData.description
                  : "No overview found"}
              </p>
            </div>
            <div>
              <IframeComp stream={streamUrl} />
            </div>
            <div className="w-full flex flex-col gap-3 mt-15">
              <h1 className="text-lg md:text-base font-medium">
                Torrent Links
              </h1>
              {movieData?.torrent?.map((torrent, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center w-full bg-black text-white p-4 rounded-lg shadow cursor-pointer hover:bg-white hover:text-black transition duration-300"
                  onClick={() => window.open(torrent.magnet, "_blank")}
                >
                  <h1 className="text-sm md:text-base font-medium">
                    🎬 Quality : {torrent.quality}
                  </h1>
                  <h1 className="text-sm md:text-base font-medium">
                    💾 Size: {torrent.size}
                  </h1>
                </div>
              ))}
            </div>

            {movieData.other_links && (
              <>
                <div className="w-full flex flex-col gap-3 mt-6">
                  <h1 className="text-lg md:text-base font-medium">
                    Other Links
                  </h1>
                  {movieData?.other_links?.map((other, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-center w-full bg-black text-white p-4 rounded-lg shadow cursor-pointer hover:bg-white hover:text-black transition duration-300"
                      onClick={() => window.open(other.url, "_blank")}
                    >
                      <h1 className="text-sm md:text-base font-medium">
                        🎬 {other.type}
                      </h1>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadPlayer;
