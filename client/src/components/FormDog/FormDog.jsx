import React, { useEffect, useState } from "react";
import { createDog, getAllTemperaments } from "../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import s from "./FormDog.module.css";
import { Nav } from "../Nav/Nav";

export function FormDog() {
  let temp = useSelector((state) => state.allTemperaments);
  let dispatch = useDispatch();


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
  }, [dispatch]);

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

  let handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  };

  let handleDeleteTemp = (el) => {
    setInput({
      ...input,
      temperament: input.temperament?.filter((t) => t !== el),
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(input));
    alert("¡¡¡The dog was successfully created");
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
    <div>
      <Nav />
      <form onSubmit={handleSubmit} id={s.dogForm}>
        <label htmlFor="name">Name</label>
        <input
          autoComplete="off"
          onChange={handleInputChange}
          value={input.name}
          type="text"
          name="name"
          id=""
        />
        {!errors.name ? null : <p className={s.danger}>{errors.name}</p>}
        <label htmlFor="minHeight">Min height</label>
        <input
          autoComplete="off"
          placeholder="Put the value in cm"
          onChange={handleInputChange}
          value={input.minHeight}
          type="text"
          name="minHeight"
          id=""
        />
        {!errors.minHeight ? null : (
          <p className={s.danger}>{errors.minHeight}</p>
        )}
        <label htmlFor="maxHeight">Max height</label>
        <input
          autoComplete="off"
          placeholder="Put the value in cm"
          onChange={handleInputChange}
          value={input.maxHeight}
          type="text"
          name="maxHeight"
          id=""
        />
        {!errors.maxHeight ? null : (
          <p className={s.danger}>{errors.maxHeight}</p>
        )}
        <label htmlFor="minWeight">Min weight</label>
        <input
          autoComplete="off"
          placeholder="Put the value in kg"
          onChange={handleInputChange}
          value={input.minWeight}
          type="text"
          name="minWeight"
          id=""
        />
        {!errors.minWeight ? null : (
          <p className={s.danger}>{errors.minWeight}</p>
        )}
        <label htmlFor="maxWeight">Max weight</label>
        <input
          autoComplete="off"
          placeholder="Put the value in kg"
          onChange={handleInputChange}
          value={input.maxWeight}
          type="text"
          name="maxWeight"
          id=""
        />
        {!errors.maxWeight ? null : (
          <p className={s.danger}>{errors.maxWeight}</p>
        )}
        <label htmlFor="life_span">Life Span</label>
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
        <label htmlFor="image">Image</label>
        <input
          autoComplete="off"
          placeholder="Paste the url of the image"
          onChange={handleInputChange}
          value={input.image}
          type="url"
          name="image"
          id=""
        />
        <label htmlFor="temperament">Temperament</label>
        <p>*If you wanna select multiple temperaments, hold ctrl + click</p>
        <select onChange={handleSelect} name="temperament" id="" size={10}>
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
                <div key={el}>
                  <span>{el}</span>
                  <div>
                    <button onClick={() => handleDeleteTemp(el)}>x</button>
                  </div>
                </div>
              ))}
        </div>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}