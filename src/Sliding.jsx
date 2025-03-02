import React from "react";
import Marquee from "react-fast-marquee";
const Sliding = () => {
  return (
    <>
      <Marquee
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#FF4500",
          backgroundColor: "#000",
          padding: "10px",
          letterSpacing: "1px",
        }}
      >
        🎃 Specially Added for Horror Lovers! 👻 | Enjoy Spine-Chilling Thrills!
        🩸 | Watch If You Dare... 😱
      </Marquee>
    </>
  );
};

export default Sliding;
