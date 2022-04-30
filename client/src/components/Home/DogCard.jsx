import React from "react";
import { Link } from "react-router-dom";
import s from "./DogCard.module.css";

export function DogCard(props) {
  let arrTemp = [];
  props.temperaments?.forEach((temp) => {
    arrTemp.push(temp.name);
  });

  let tempStr = arrTemp.join(", ");

  return (
    <div className={s.card} key={props.id}>
      <Link to={"detail/" + props.id}>
        <img id={s.imagen} src={props.image} alt={props.name} />
      </Link>
      <h2>{props.name}</h2>
      <p>{tempStr}</p>
      <p>Weight: {props.weight} </p>
    </div>
  );
}
