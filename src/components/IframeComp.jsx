import React from "react";
import comming from "../assets/coming.mp4";

const IframeComp = ({ stream }) => {
  const adblockUrl =
    "https://chromewebstore.google.com/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg";
  const braveDownloadUrl =
    "https://play.google.com/store/apps/details?id=com.brave.browser&hl=en_IN";

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={stream ? `https://dhcplay.com/e/${stream}` : comming}
          allowFullScreen
          referrerPolicy="no-referrer"
          className="w-full h-full border-0"
        />
      </div>
      
      <div className="mt-6 mb-12 bg-slate-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Avoid Ads with These Solutions</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="flex-1 p-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
            onClick={() => window.open(adblockUrl, "_blank")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            AdGuard Extension
          </button>
          
          <button
            className="flex-1 p-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
            onClick={() => window.open(braveDownloadUrl, "_blank")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
            Brave Browser (Mobile)
          </button>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          Using an ad blocker or privacy-focused browser can improve your viewing experience by removing unwanted ads.
        </p>
      </div>
    </div>
  );
};

export default IframeComp;