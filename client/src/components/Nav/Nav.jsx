import React from "react";
import s from "./Nav.module.css"
import { Link } from "react-router-dom";


export function Nav() {
    
    return(
        <nav id={s.navigator}>
            <Link id={s.home} to={"/home"}>
              HOME
            </Link>
        </nav>

    )
}