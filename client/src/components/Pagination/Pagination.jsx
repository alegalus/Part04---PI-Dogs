import React, { useState } from "react";
import s from "./Pagination.module.css";

export function Pagination(props) {
  let [currentNum, setCurrentNum] = useState(1);
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalDogs / props.dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  let handleClickNum = (number) => {
    props.paginate(number)
    setCurrentNum(number)
  }


  return (
    <nav>
      <ul id={s.pageNum}>
        {pageNumbers.map((num) => (
          <li id={s.pageLi} className={currentNum === num ? s.active : ''} key={num}>
            <a value={num} onClick={() => handleClickNum(num)}>
              {num}
            </a>
          </li>
        ))}
        
      </ul>
    </nav>
  );
}
