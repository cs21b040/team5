import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Styles/header.css";

function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [color, setColor] = useState(false);
    const changeColor = () => {
      if(window.scrollY >= 100){
        setColor(true);
      }
      else setColor(false);
    }
    window.addEventListener('scroll',changeColor);
  return (
    <div className={color ? "header-bg" :"header"}>
        <Link to="/">
        <h1 style={{ fontSize: "3rem" }}>IIT Hub</h1>
      </Link>
      <ul className={click ? "Nav-menu active":"Nav-menu" }>
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/alumni">Alumni</Link></li>
        <li><Link to="/academic">Academic</Link></li>
        <li><Link to="/research">Research</Link></li>
        </ul>
        <div className="menu-style" onClick={handleClick}>
            {click ?  (<FaTimes size={30} style={{color:"#black"}}/>):(<FaBars size={30} style={{color:"#black"}}/>)}
      </div>
    </div>
  );
}

export default Header;