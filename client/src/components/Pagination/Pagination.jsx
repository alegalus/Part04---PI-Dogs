import React from "react";
import s from "./Pagination.module.css"

export function Pagination(props) {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalDogs / props.dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
      <ul id={s.pageNum}>
        {pageNumbers.map((num) => (
          <li id={s.pageLi} key={num}>
            <a onClick={() => props.paginate(num)}>{num}</a>
          </li>
        ))}
      </ul>
    
  );
}
