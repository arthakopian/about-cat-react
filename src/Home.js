import React from "react";
import video from "./img/Home.mp4"

export default function Home() {
  return (
    <div className="full-screen" id="home">
      <div className="full-screen--text">
        Here are everything about cats
      </div>
      <video className="full-screen--video" preload="auto" autoPlay muted loop src={video}>
      </video>
    </div>
  )
}