import React, { useEffect, useState } from "react";
import { createDog, getAllTemperaments } from "../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import s from "./FormDog.module.css";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import { Modal } from "../Modal/Modal";

export function FormDog() {
  let temp = useSelector((state) => state.allTemperaments);
  let dispatch = useDispatch();
  let [winModal, setWinModal] = useState(false)


  let [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  let [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllTemperaments()); 
  }, []);
//en el objeto error voy guardando los errores de acuerdo a si no tiene el input o a si 
//no cumple con cierto requisito
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    } else if (/^[+-]?[0-9]+$/.test(input.name)) {
      errors.name = "Alphabetic characters only";
    }

    if (!input.minHeight) {
      errors.minHeight = "Min Height is required";
    } else if (!/^[+-]?[0-9]+$/.test(input.minHeight)) {
      errors.minHeight = "Numeric characters only";
    }

    if (!input.maxHeight) {
      errors.maxHeight = "Max Height is required";
    } else if (!/^[+-]?[0-9]+$/.test(input.maxHeight)) {
      errors.maxHeight = "Numeric characters only";
    }

    if (!input.minWeight) {
      errors.minWeight = "Min Weight is required";
    } else if (!/^[+-]?[0-9]+$/.test(input.minWeight)) {
      errors.minWeight = "Numeric characters only";
    }

    if (!input.maxWeight) {
      errors.maxWeight = "Max Weight is required";
    } else if (!/^[+-]?[0-9]+$/.test(input.maxWeight)) {
      errors.maxWeight = "Numeric characters only";
    }

    if (!input.life_span) {
      errors.life_span = "Life Span is required";
    }

    return errors;
  }
//aca voy guardando input para poder acceder a los datos con onchange y que vaya generando los errores
  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
//este handle maneja los select para que los vaya agregando en un arreglo cuando los selecciono
  let handleSelect = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.concat(e.target.value),
      // [...input.temperament, e.target.value]
    });
  };
//este me hace un filter y me va borrando los que quiero sacar
  let handleDeleteTemp = (el) => {
    setInput({
      ...input,
      temperament: input.temperament?.filter((t) => t !== el),
    });
  };
//envia los datos de formulario enviando el objeto con los datos como payload en el dispatch del post
//luego limpia los input para seguir cargando un nuevo perro
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(input));
    setWinModal(true)
    setInput({
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      life_span: "",
      image: "",
      temperament: [],
    });
  };

  return (
    <div className={s.mainForm}>
      <Nav />
      <h2 id={s.title}>Create your dog</h2>
      <p id={s.text}>Complete the data to create your own breed</p>
      <form onSubmit={handleSubmit} id={s.dogForm}>
        <label htmlFor="name">Name:</label>
        <input
          required
          autoComplete="off"
          //en el onchange pasamos la funcion donde guarda los input
          onChange={handleInputChange}
          //en value lo conectamos con el valor que necesitanos que guarde
          value={input.name}
          type="text"
          name="name"
          id=""
        />
        {//abajo vamos mostrando los errores
        !errors.name ? null : <p className={s.danger}>{errors.name}</p>}
        <label htmlFor="minHeight">Min height:</label>
        <input
          required
          autoComplete="off"
          onChange={handleInputChange}
          value={input.minHeight}
          type="text"
          name="minHeight"
          id=""
        />
        {!errors.minHeight ? null : (
          <p className={s.danger}>{errors.minHeight}</p>
        )}
        <label htmlFor="maxHeight">Max height:</label>
        <input
          required
          autoComplete="off"
          onChange={handleInputChange}
          value={input.maxHeight}
          type="text"
          name="maxHeight"
          id=""
        />
        {!errors.maxHeight ? null : (
          <p className={s.danger}>{errors.maxHeight}</p>
        )}
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
        {!errors.minWeight ? null : (
          <p className={s.danger}>{errors.minWeight}</p>
        )}
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
        {!errors.maxWeight ? null : (
          <p className={s.danger}>{errors.maxWeight}</p>
        )}
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
        {!errors.life_span ? null : (
          <p className={s.danger}>{errors.life_span}</p>
        )}
        <label htmlFor="image">Image:</label>
        <input
          autoComplete="off"
          placeholder="Paste the url of the image"
          onChange={handleInputChange}
          value={input.image}
          type="url"
          name="image"
          id=""
        />
        <label htmlFor="temperament">Temperament:</label>
        <select onChange={handleSelect} name="temperament" id="" size={0}>
          <option className={s.optionOne}>Select the options</option>
          {temp?.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
        <br />
        <div>
          {input.temperament.length === 0
            ? null
            : input.temperament?.map((el) => (
                <div id={s.temp} key={el}>
                  <span>{el}</span>
                  <div>
                    <button
                      id={s.deleteButton}
                      onClick={() => handleDeleteTemp(el)}
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <br />
        <button id={s.createButton} type="submit">
          Create
        </button>
      </form>
      <div>
        <Footer />
      </div>
      <div>
        {/*mostramos el modal cuando creamos el perro y en el boton de aceptar cambiamos el estado a false para desmontarlo */}
        <Modal state={winModal} >
          <p>The dog was successfully created</p>
          <h3>You can continue creating breeds of dogs</h3>
          <button onClick={() => setWinModal(false)}>Accept</button>
        </Modal>
      </div>
    </div>
  );
}
