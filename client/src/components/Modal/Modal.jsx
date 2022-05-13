import React from "react";
import s from "./Modal.module.css";
//en la ventana modal hacemos destructuring de children(podria ser prop.children sin destructuring)
//eso es lo que me va  atraer todo lo que ponga en los componentes, asi puedo reutilizar este modal
//en state(podria ser props.state sin destructuring) traigo el valor, si tiene o sea si es true lo muestra
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
