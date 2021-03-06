import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../../actions/action";
import s from "./SearchBar.module.css";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setSearch(e.target.value);
  }
//diparo la action de search con el valor del input que me va a conectar con el back y me va a modificar el state del reducer
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchDog(search));
    setSearch("");
  }

  return (
    <div>
      <form id={s.search} onSubmit={handleSubmit}>
        <input
          required
          value={search}
          type="search"
          onChange={handleChange}
          placeholder="Search by breeds"
        />

        <button type="submit">Search</button>
      </form>
      <div></div>
    </div>
  );
}
