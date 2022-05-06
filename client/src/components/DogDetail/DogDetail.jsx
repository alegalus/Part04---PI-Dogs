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
  let dispatch = useDispatch();
  let { id } = useParams();
  let detail = useSelector((state) => state.dogDetail);
  let history = useHistory();
  let [winModalDelete, setWinModalDelete] = useState(false);
  let [winModalUpdate, setWinModalUpdate] = useState(false);
  let [updateState, setUpdateState] = useState(false);

  let [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
  });

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  let handleOpenUpdateForm = () => {
    setUpdateState(true);
    setInput({
      name: detail.name,
      minHeight: detail.weight.substring(0, 2).trim(),
      maxHeight: detail.weight.substring(5, 7).trim(),
      minWeight: detail.weight.substring(0, 2).trim(),
      maxWeight: detail.weight.substring(5, 7).trim(),
      life_span: detail.life_span.substring(0, 7).trim(),
    });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDog(id, input));
    setWinModalUpdate(true)
  
    setTimeout(() => {
      dispatch(clearDetail());
      dispatch(getDogDetail(id));
      setWinModalUpdate(false)
      setUpdateState(false)
    }, 3000);
  };

  let handleDelete = () => {
    dispatch(deleteDog(id));
    setWinModalDelete(true);
    setTimeout(() => {
      history.push("/home");
    }, 3000);
  };

  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let arrTemp = [];
  detail.temperaments?.forEach((temp) => {
    arrTemp.push(temp.name);
  });

  let tempStr = arrTemp.join(", ");

  return (
    <>
      <Nav />
      <>
        {!updateState && (
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
        <Modal state={winModalDelete} handleChangeModal={setWinModalDelete}>
          <p>The dog was deleted</p>
          <h3>You can continue visiting the page</h3>
        </Modal>
      </div>
      <div>
        <Modal state={winModalUpdate} handleChangeModal={setWinModalUpdate}>
          <h4>The data was updated successfully</h4>
          <h3>You can continue visiting the page</h3>
        </Modal>
      </div>
    </>
  );
}
