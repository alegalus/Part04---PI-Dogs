import React from "react";
import s from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div>
      
      <div id={s.image}>
        
    
      </div>

      <Link id={s.welcome} to="/home">
        WELCOME
      </Link>
    </div>
  );
}
