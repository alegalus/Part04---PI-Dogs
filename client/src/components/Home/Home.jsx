import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getAllTemperaments,
  orderByName,
  orderByWeight,
  filterByTemp,
  filterByOrigin,
  clearAllDogs,
} from "../../actions/action";
import { DogCard } from "./DogCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import s from "./Home.module.css";

export function Home() {
  let dispatch = useDispatch();
  let dogs = useSelector((state) => state.allDogs);
  let temp = useSelector((state) => state.allTemperaments);
  //definimos este state para que me muestre el cargando
  let [loading, setLoading] = useState(false);
//prirmero pongo aca los datos a traer con el dispatch pero lo hago asincorono y cambio a 
//true el setloading, para que me deje de mostrar el cargando
  async function data() {
    await Promise.all([dispatch(getAllDogs()), dispatch(getAllTemperaments())]);
    setLoading(true);
  }
  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearAllDogs());
    };
  }, []);

  //Paginate
  //defino la cantidad de ccards dog por pagina y definicmos el estado de currentpage para saber en que pagina vamos a estar
  let [currentPage, setCurrentPage] = useState(1);
  let [dogsPerPage, setDogsPerPage] = useState(8);

//aca definimos el principio el fin de cada pagina
  let indexLastDog = currentPage * dogsPerPage;
  let indexFirstDog = indexLastDog - dogsPerPage;
  //en current dog armo un nuevo array con los perros de cada pagina y ese es el que voy a recorrer con las dogs card
  let currentDog = dogs.slice(indexFirstDog, indexLastDog);
//esta funcion es la que paso para que sepa en que pagina esta y muestre los perros que corresponden
  let paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  //Reaload
  function reloadSubmit() {
    dispatch(getAllDogs());
  }

  //Ordenamiento y filtrado
  //este estado es solo para renderizar los cambios, solo uso el set order
  const [order, setOrder] = useState("");
//en los ordenamiento y en flitrado siempre uso el e.target.value y no el orden, eso tiene que ver por que usamos un select comun
//react tiene un elemento especial para esto que funciona mejor
  function handleOrderByName(e) {
    //aca disparo el ordenamiento
    dispatch(orderByName(e.target.value));
    //y aca uso el estado para renderizar
    setOrder(e.target.value);
   
  }
  let handleOrderByWeight = (e) => {
    dispatch(orderByWeight(e.target.value));
    setOrder(e.target.value);
  };
//en los filtros es igual al ordenamiento, solo que tengo que definir el currentpage en 1 paara que seimpre sea la pagina
//uno la primera ya que al filtrar pueden ser menos perros
  let handleFilterByTemp = (e) => {
    dispatch(filterByTemp(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1)
  };

  let handleFilterByOrigin = (e) => {
    dispatch(filterByOrigin(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1)
  };

  return (
    <div id={s.main}>
      <div>
        <div>
          <Nav />
        </div>
        <div id={s.form}>
          <Link className={s.formLink} to={"/Formdog"}>
            Create Dog
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
          <button type="submit">Reload</button>
        </form>
      </div>
      <div id={s.dogCardPos}>

        {//si esta en loading mustra todo los datos, si no tiene lenght el dog me mustra que no encontro ningun perro
        //todo cvon renderizado condicional
        loading ? (
          dogs.length ? (
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
          ) : (
            <div id={s.notFound}>
              <img src="https://i.ibb.co/zJwvbYf/3734.png" alt="huellas"></img>
              <h3>Dogs not found</h3>
              <img src="https://i.ibb.co/zJwvbYf/3734.png" alt="huellas"></img>
            </div>
          )
        ) : (
          <div>
            <h2>Cargando....</h2>
          </div>
        )}
      </div>
      {loading ? (
        dogs.length ? (
          <div id={s.pagination}>
            <Pagination
              dogsPerPage={dogsPerPage}
              totalDogs={dogs.length}
              paginate={paginate}
            />
          </div>
        ) : null
      ) : null}

      {loading ? (
        dogs.length ? (
          <div>
            <Footer />
          </div>
        ) : null
      ) : null}
    </div>
  );
}
