import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  orderByName,
  orderByWeight,
  getAllTemperaments,
  filterByTemp,
  filterByOrigin,
} from "../../actions/action";
import { DogCard } from "./DogCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";
import { Nav } from "../Nav/Nav";
import s from "./Home.module.css";

export function Home() {
  let dispatch = useDispatch();
  let dogs = useSelector((state) => state.allDogs);
  let temp = useSelector((state) => state.allTemperaments);
  let filterDogs = useSelector((state) => state.filterDogs);
  let [currentPage, setCurrentPage] = useState(1);
  let [dogsPerPage /*setDogsPerPage*/] = useState(8);

  const [, /*order*/ setOrder] = useState("");
  const [, /*weight*/ setWeight] = useState("");
  const [, /*temp*/ setTemp] = useState("");
  const [, /*origin*/ setOrigin] = useState("");

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  let indexLastDog = currentPage * dogsPerPage;
  let indexFirstDog = indexLastDog - dogsPerPage;
  let currentDog = dogs.slice(indexFirstDog, indexLastDog);
  let currentFilterDog = filterDogs.slice(indexFirstDog, indexLastDog);

  let paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  function reloadSubmit() {
    dispatch(getAllDogs());
  }

  function handleOrderByName(e) {
    dispatch(orderByName(e.target.value));
    setOrder(e.target.value);
  }

  let handleOrderByWeight = (e) => {
    dispatch(orderByWeight(e.target.value));
    setWeight(e.target.value);
  };

  let handleFilterByTemp = (e) => {
    dispatch(filterByTemp(e.target.value));
    setTemp(e.target.value);
  };

  let handleFilterByOrigin = (e) => {
    dispatch(filterByOrigin(e.target.value));
    setOrigin(e.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <Nav />
        </div>
        <div id={s.form}>
          <Link className={s.formLink} to={"/Formdog"}>
            ADD DOG
          </Link>
        </div>
        <div id={s.search}>
          <SearchBar />
        </div>

        <div id={s.filters}>
          <div id="byName">
            <select name="Order By Name" onChange={handleOrderByName}>
              <option>Order By Name</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          <div id="byweight">
            <select name="Order By Weight" onChange={handleOrderByWeight}>
              <option>Order By Weight</option>
              <option value="Min to Max">Min to Max</option>
              <option value="Max to Min">Max to Min</option>
            </select>
          </div>
          <div id="byTemperaments">
            <select name="" id="" onChange={handleFilterByTemp}>
              <option value="all">Temperament</option>
              {temp?.map((t) => (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div id="dogCreated">
            <select name="" id="" onChange={handleFilterByOrigin}>
              <option value="all">Dog Origin</option>
              <option value="Api Dog">Api Dog</option>
              <option value="Data Base Dog">Data Base Dog</option>
            </select>
          </div>
        </div>

        <form id={s.reload} onSubmit={reloadSubmit}>
          <button type="submit">Reload Dogs</button>
        </form>
      </div>
      <div id={s.dogCardPos}>
        {filterDogs.length === 0 ? (
          dogs.length === 0 ? (
            <h3>Searching...</h3>
          ) : (
            currentDog.map((dog) => (
              <DogCard
                id={dog.id}
                key={dog.id}
                image={dog.image}
                name={dog.name}
                temperaments={dog.temperaments}
                weight={dog.weight}
              />
            ))
          )
        ) : (
          currentFilterDog.map((dog) => (
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
      <div id={s.pagination}>
        {filterDogs.length === 0 ? (
          <Pagination
            dogsPerPage={dogsPerPage}
            totalDogs={dogs.length}
            paginate={paginate}
          />
        ) : (
          <Pagination
            dogsPerPage={dogsPerPage}
            totalDogs={filterDogs.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
}
