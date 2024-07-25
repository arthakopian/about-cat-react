import React from "react";

export default function Header() {
  return (
    <div className="navigation" >
      <ul className="navigation-list">
        <li className="navigation-item"><a href="#home">Home</a></li>
        <li className="navigation-item"><a href="#images">Images</a></li>
        <li className="navigation-item"><a href="#breed">Breed</a></li>
        <li className="navigation-item"><a href="/#">Facts</a></li>
        <li className="navigation-item"><a href="/#">About Us</a></li>
      </ul>
    </div>
  )
}