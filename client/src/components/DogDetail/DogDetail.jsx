import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDetail,
  deleteDog,
  getDogDetail,
  updateDog,
} from "../../actions/action";
import { useHistory, useParams } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import s from "./DogDetail.module.css";
import { Footer } from "../Footer/Footer";
import { Modal } from "../Modal/Modal";

export function DogDetail() {
  //guardo el usedispatch para poder diparar las acciones
  let dispatch = useDispatch();
  //guardo el id que viene por params
  let { id } = useParams();
  //con el use selector me traigo la parte que quiero del state del reducer
  let detail = useSelector((state) => state.dogDetail);
  //el history es para pasar de pagina
  let history = useHistory();
  //Estos dos estados locales (win) son para mostrar el modal de delete y de update
  let [winModalDelete, setWinModalDelete] = useState(false);
  let [winModalUpdate, setWinModalUpdate] = useState(false);
  //con este estado muestro el formulario de update y oculto el de detail
  let [updateState, setUpdateState] = useState(false);

//aca creo el estado que me va a guardar los input del update Form
  let [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
  });
//cuando se renderiza el componente disparo la accion para que actualice el state
  useEffect(() => {
    dispatch(getDogDetail(id));
  }, []);

//cuando desmonto el comonente limpio los datos para que no sigan estando cuando vuelva
  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, []);
//cuando preciono el update button de detail me cambia el estado y me mustra el formulario con los datos del dog actual
  let handleOpenUpdateForm = () => {
    setUpdateState(true);
    setInput({
      name: detail.name,
      //guardo los datos del string segun corresponda en min o max
      minHeight: detail.weight.substring(0, 2).trim(),
      maxHeight: detail.weight.substring(5, 7).trim(),
      minWeight: detail.weight.substring(0, 2).trim(),
      maxWeight: detail.weight.substring(5, 7).trim(),
      life_span: detail.life_span.substring(0, 7).trim(),
    });
  };
  //envio los datos del formulario
  //disparo el put, enviando como parametro el id y el objeto para modificar
  //luego abro la ventana modal de update
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDog(id, input));
    setWinModalUpdate(true)
  //es un settime donde limpio los datos y los vuelvo a cargar para que se actualicen
  //cambio los dos estados del modal y del form para que se oculten y me muestre solo el detail
    setTimeout(() => {
      dispatch(clearDetail());
      dispatch(getDogDetail(id));
      setWinModalUpdate(false)
      setUpdateState(false)
    }, 3000);
  };
  
  //disparo el delete, enviando como parametro el id 
  //luego abro la ventana modal de delete
  let handleDelete = () => {
    dispatch(deleteDog(id));
    setWinModalDelete(true);
    //con el history me vuelvo a la pagina principal ya que no existe mas el elemento que elimine
    setTimeout(() => {
      history.push("/home");
    }, 3000);
  };
//lo conecto con el onChange para capturar los datos de los input
  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
//recorro los temp y los guardo en un string para poder mostrarlos en la card
  let arrTemp = [];
  detail.temperaments?.forEach((temp) => {
    arrTemp.push(temp.name);
  });

  let tempStr = arrTemp.join(", ");

  return (
    <>
    
      <Nav />
      <>
        {//si el estado modal es false renderizo el detail y cuando cambia el form
        !updateState && (
          <div id={s.mainDetail}>
            <div id={s.detail}>
              <img src={detail.image} alt={detail.name} />
              <h2>{detail.name}</h2>
              <p className={s.temp}>{tempStr}</p>
              <p>Weight: {detail.weight}</p>
              <p>Height: {detail.height}</p>
              <p>Life Span: {detail.life_span}</p>
              {id.length <= 3 ? null : (
                <div className={s.buttons}>
                  <button onClick={handleOpenUpdateForm} id={s.updateButton}>
                    Update Dog
                  </button>
                  <button id={s.deleteButton} onClick={handleDelete}>
                    Delete Dog
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
      <>
        {updateState && (
          <div>
            <h2 id={s.title}>Update your dog</h2>
            <form onSubmit={handleSubmit} id={s.dogForm}>
              <label htmlFor="name">Name:</label>
              <input
                required
                autoComplete="off"
                onChange={handleInputChange}
                value={input.name}
                type="text"
                name="name"
                id=""
              />

              <label htmlFor="minHeight">Min height:</label>
              <input
                required
                autoComplete="off"
                onChange={handleInputChange}
                value={input.minHeight}
                type="number"
                name="minHeight"
                id=""
              />

              <label htmlFor="maxHeight">Max height:</label>
              <input
                required
                autoComplete="off"
                onChange={handleInputChange}
                value={input.maxHeight}
                type="number"
                name="maxHeight"
                id=""
              />

              <label htmlFor="minWeight">Min weight:</label>
              <input
                required
                autoComplete="off"
                onChange={handleInputChange}
                value={input.minWeight}
                type="number"
                name="minWeight"
                id=""
              />

              <label htmlFor="maxWeight">Max weight:</label>
              <input
                required
                autoComplete="off"
                onChange={handleInputChange}
                value={input.maxWeight}
                type="number"
                name="maxWeight"
                id=""
              />

              <label htmlFor="life_span">Life Span:</label>
              <input
                autoComplete="off"
                placeholder="Example 10 - 12"
                onChange={handleInputChange}
                value={input.life_span}
                type="text"
                name="life_span"
                id=""
              />

              <button id={s.createButton} type="submit">
                Update
              </button>
            </form>
          </div>
        )}
      </>

      <div>
        <Footer />
      </div>
      <div>
        {/*aca esta la conexion con el modal, esta info esta conectada con children por eso es un modal reutilizable que  */}
        {/*puede variar su contenido, le paso el state que es el que me va a mostrar o no el modal */}
        <Modal state={winModalDelete}>
          <p>The dog was deleted</p>
          <h3>You can continue visiting the page</h3>
        </Modal>
      </div>
      <div>
        <Modal state={winModalUpdate}>
          <h4>The data was updated successfully</h4>
          <h3>You can continue visiting the page</h3>
        </Modal>
      </div>
    </>
  );
}
