import React, { useEffect, useState } from "react";
import s from "./Pagination.module.css";

export function Pagination(props) {
  //el set currennum lo uso para activar la classname para que quede marcado el numero
  let [currentNum, setCurrentNum] = useState(1);
  //esto es para que renderice la cantidad de paginas, dividiendo el totaldogs y el dogsperpage que me traigo de home
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalDogs / props.dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  let [screen, setScreen] = useState();
  //aca paso el current para que me cambie cuando hago el click y a su vez traigo de home el la currentpage para que quede seleccionada
  let handleClickNum = (number) => {
    props.paginate(number);
    setCurrentNum(number);
  };

  useEffect(() => {
    setScreen(window.innerWidth);
  });

  return (
    <nav>
      <ul id={s.pageNum}>
        {/*para agregar el next y el prev le sumo o resto uno a currentNum para poder avanzar y compruebo al principio y al final */}
        {/*para evitar que se pase de largo */}
        <input
          className={s.nextPrev}
          onClick={() => currentNum > 1 && handleClickNum(currentNum - 1)}
          type="button"
          value="prev"
        />

        {/*recorro ese arreglo que arme y lo mistro en pantalla y le paso el onclick para ir a cada pagina */}
        {screen > 1400 &&
          pageNumbers.map((num) => (
            <li
              id={s.pageLi}
              className={currentNum === num ? s.active : ""}
              key={num}
            >
              <a value={num} onClick={() => handleClickNum(num)}>
                {num}
              </a>
            </li>
          ))}
        <input
          className={s.nextPrev}
          onClick={() =>
            currentNum < pageNumbers.length && handleClickNum(currentNum + 1)
          }
          type="button"
          value="next"
        />
      </ul>
    </nav>
  );
}
