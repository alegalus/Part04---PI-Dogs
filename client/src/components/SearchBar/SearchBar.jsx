import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { searchDog } from "../../actions/action";


export function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchDog(search));
    setSearch("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={search}
          type="search"
          onChange={handleChange}
          placeholder="Search by race"
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
}
