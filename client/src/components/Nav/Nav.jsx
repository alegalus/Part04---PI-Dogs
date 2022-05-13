import React from "react";
import s from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getAllDogs } from "../../actions/action";

export function Nav() {
  let dispatch = useDispatch();

  function reloadHome() {
    dispatch(getAllDogs());
  }

  return (
    <nav id={s.navigator}>
      <Link onClick={reloadHome} id={s.home} to={"/home"}>
        HOME
      </Link>
    </nav>
  );
}
