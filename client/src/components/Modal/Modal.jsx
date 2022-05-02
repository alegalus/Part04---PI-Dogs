import React, { Children } from "react";
import s from "./Modal.module.css";

export function Modal({ children, state }) {
  return (
    <>
      {state && (
        <div id={s.modalBack}>
          <div id={s.modal}>
            <img src="https://i.ibb.co/42qVccX/320.jpg" alt="Happy dog"></img>
            <h3>Hello</h3>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
