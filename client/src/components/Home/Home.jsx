import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDogs } from "../../actions/action";
import { DogCard } from "./DogCard";
import { SearchBar } from "./SearchBar";


export function Home() {
  let dispatch = useDispatch();
  let dogs = useSelector((state) => state.allDogs);

  useEffect(() => {
    dispatch(getAllDogs());
  }, []);

  function reloadSubmit(e) {
    dispatch(getAllDogs());
  }

  return (
    <div>
       
      <h1>Dog App</h1>
      <SearchBar />
      <form onSubmit={reloadSubmit} >
         <button type="submit">Reload Dogs</button>
       </form>
      {dogs.length === 0 ? (
        <h3>Searching...</h3>
      ) : (
        dogs.map((dog) => (
          <DogCard
            id={dog.id}
            key={dog.id}
            image={dog.image}
            name={dog.name}
            temperaments={dog.temperaments}
            weight={dog.weight}
          />
        ))
      )}
    </div>
  );
}
