import React, { useEffect, useState } from "react";
import Home from "./Home";
import Header from "./Header";
import Images from "./Images";
import Breed from "./Breed";
import upArrow from "./img/up-arrow_icon-icons.com_73351.svg"

function App() {
  const [className, setClassName] = useState('up')

  useEffect(() => {
    window.addEventListener('scroll', function () {
      setClassName(window.scrollY > 500 ? "up active" : 'up')
    })
  }, [])

  const backToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  return (
    <>
      <div id="wrapper">
        <Header />
        <Home />
        <div className="content">
          <Images />
          <Breed />
        </div>
      </div>
      <div onClick={backToTop} className={className}>
        <img src={upArrow} alt="..." />
      </div>
    </>
  );
}

export default App;