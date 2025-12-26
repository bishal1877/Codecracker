"use client"
import React, { useEffect, useState } from "react";
import DecryptedText from "./component/Decrypt/Decrypt";
import Home from "./component/Home/Home";
import styles from'./page.module.css';
import Galaxy from "./component/Lightray/Galaxy";


const page = () => {
  const [showDelayed, setShowDelayed] = useState(true);

setTimeout(() => {
      setShowDelayed(false);
    }, 2500);

  return (
    <div style={{ position: "relative",height:"calc(100vh - 60.5px)" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={0.7}
          glowIntensity={0.2}
          saturation={0.8}
          hueShift={7}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: "2"
        }}
      >
        <DecryptedText
          text="Crack the code with Codecracker!"
          animateOn="view"
          revealDirection="center"
          sequential="true"
        />
      </div>
      <div className={`${styles.homc}`}>
        <Home></Home>
      </div>
    </div>
  );
};

export default page;
